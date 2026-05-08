"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { withBasePath } from "../../lib/basePath";
import { eventAppConfig as config } from "./eventAppData";
import styles from "./page.module.css";

const tabs = [
  ["schedule", "Πρόγραμμα"],
  ["speakers", "Ομιλητές"],
  ["performers", "Performances"],
  ["workshops", "Workshops"],
  ["sponsors", "Sponsors"],
  ["giveaway", "Giveaway"],
];

const asset = (path) => withBasePath(`/event/aggelosApp/${path}`);
const photo = (file) => asset(`photos/${file}`);

function nowTime() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

function initialCounts() {
  return Object.fromEntries(config.workshops.map((workshop) => [workshop.id, 0]));
}

function firestoreUrl(path) {
  const { apiKey, projectId } = config.firebase;
  const suffix = path.startsWith(":") ? path : `/${path}`;
  return `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents${suffix}?key=${apiKey}`;
}

async function runFirestoreQuery(collectionId, filters = []) {
  const fields = filters.map(([field, value]) => ({
    fieldFilter: {
      field: { fieldPath: field },
      op: "EQUAL",
      value: { stringValue: value },
    },
  }));

  const structuredQuery = {
    from: [{ collectionId }],
  };

  if (fields.length > 0) {
    structuredQuery.where = fields.length === 1 ? fields[0] : { compositeFilter: { op: "AND", filters: fields } };
  }

  const body = {
    structuredQuery: {
      ...structuredQuery,
    },
  };

  const response = await fetch(firestoreUrl(":runQuery"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error("firestore-read");
  const rows = await response.json();
  return rows.map((row) => row.document).filter(Boolean);
}

async function createFirestoreDocument(collectionId, data) {
  const fields = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, { stringValue: String(value) }]),
  );
  fields.registeredAt = { timestampValue: new Date().toISOString() };

  const response = await fetch(firestoreUrl(collectionId), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fields }),
  });

  if (!response.ok) throw new Error("firestore-write");
  return response.json();
}

function readFirestoreDocument(doc) {
  const fields = doc?.fields || {};
  return Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [
      key,
      value.stringValue ?? value.integerValue ?? value.doubleValue ?? value.booleanValue ?? "",
    ]),
  );
}

function classNames(...names) {
  return names.filter(Boolean).join(" ");
}

function PersonImage({ item, large = false }) {
  const [failed, setFailed] = useState(false);

  if (!item.photo || failed) {
    return <div className={styles.placeholder}>{item.initials || item.name?.[0]}</div>;
  }

  return (
    <img
      className={large ? styles.modalImage : undefined}
      src={photo(item.photo)}
      alt={item.name}
      onError={() => setFailed(true)}
    />
  );
}

export default function AggelosEventAppPage() {
  const [activeTab, setActiveTab] = useState("schedule");
  const [currentTime, setCurrentTime] = useState(nowTime);
  const [modalItem, setModalItem] = useState(null);
  const [openWorkshop, setOpenWorkshop] = useState(null);
  const [counts, setCounts] = useState(initialCounts);
  const [forms, setForms] = useState({});
  const [busyWorkshop, setBusyWorkshop] = useState(null);
  const [toast, setToast] = useState("");
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [adminRows, setAdminRows] = useState([]);
  const tapCount = useRef(0);
  const tapTimer = useRef(null);
  const toastTimer = useRef(null);

  const showToast = useCallback((message) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 2800);
  }, []);

  const refreshCounts = useCallback(async () => {
    try {
      const pairs = await Promise.all(
        config.workshops.map(async (workshop) => {
          const docs = await runFirestoreQuery("workshop_registrations", [["workshop_id", workshop.id]]);
          return [workshop.id, docs.length];
        }),
      );
      setCounts(Object.fromEntries(pairs));
    } catch {
      setCounts((current) => current);
    }
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => setCurrentTime(nowTime()), 60000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    refreshCounts();
    const interval = window.setInterval(refreshCounts, 30000);
    return () => window.clearInterval(interval);
  }, [refreshCounts]);

  useEffect(() => {
    const handleBeforeInstall = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
      window.setTimeout(() => setShowInstall(true), 1200);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  const nowIndex = useMemo(() => {
    return config.schedule.findIndex((item, index) => {
      const next = config.schedule[index + 1];
      return next && currentTime >= item.time && currentTime < next.time;
    });
  }, [currentTime]);

  const openDetails = (type, id) => {
    const items = type === "speaker" ? config.speakers : config.performers;
    const item = items.find((candidate) => candidate.id === id);
    if (item) setModalItem({ ...item, type });
  };

  const updateForm = (workshopId, field, value) => {
    setForms((current) => ({
      ...current,
      [workshopId]: { ...current[workshopId], [field]: value },
    }));
  };

  const submitWorkshop = async (workshop) => {
    const data = forms[workshop.id] || {};
    const name = data.name?.trim();
    const email = data.email?.trim();
    const ticket = data.ticket?.trim();

    if (!name || !email || !ticket) return showToast("Συμπληρώστε όλα τα πεδία");
    if (!email.includes("@")) return showToast("Μη έγκυρο email");
    if ((counts[workshop.id] || 0) >= workshop.seats) return showToast("Δεν υπάρχουν διαθέσιμες θέσεις");

    setBusyWorkshop(workshop.id);
    try {
      const existing = await runFirestoreQuery("workshop_registrations", [
        ["workshop_id", workshop.id],
        ["ticket", ticket],
      ]);

      if (existing.length > 0) {
        showToast("Αυτό το εισιτήριο έχει ήδη δεσμευτεί");
        return;
      }

      const latest = await runFirestoreQuery("workshop_registrations", [["workshop_id", workshop.id]]);
      if (latest.length >= workshop.seats) {
        showToast("Λυπούμαστε, δεν υπάρχουν θέσεις");
        return;
      }

      await createFirestoreDocument("workshop_registrations", {
        workshop_id: workshop.id,
        workshop_name: workshop.name,
        name,
        email,
        ticket,
      });

      setForms((current) => ({ ...current, [workshop.id]: {} }));
      setOpenWorkshop(null);
      showToast("Η θέση σας κρατήθηκε");
      refreshCounts();
    } catch (error) {
      console.error(error);
      showToast("Σφάλμα. Δοκιμάστε ξανά.");
    } finally {
      setBusyWorkshop(null);
    }
  };

  const runInstall = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      await installPrompt.userChoice;
      setInstallPrompt(null);
      setShowInstall(false);
      return;
    }

    const isiOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    showToast(isiOS ? "Safari: Share > Add to Home Screen" : "Browser menu > Add to Home screen");
    setShowInstall(false);
  };

  const handleLogoTap = () => {
    tapCount.current += 1;
    window.clearTimeout(tapTimer.current);
    tapTimer.current = window.setTimeout(() => {
      tapCount.current = 0;
    }, 800);

    if (tapCount.current >= 5) {
      tapCount.current = 0;
      setAdminOpen(true);
    }
  };

  const unlockAdmin = async () => {
    if (adminPass !== config.adminPass) {
      setAdminPass("");
      showToast("Λάθος κωδικός");
      return;
    }

    setAdminUnlocked(true);
    try {
      const docs = await runFirestoreQuery("workshop_registrations");
      setAdminRows(docs.map(readFirestoreDocument));
    } catch {
      showToast("Σφάλμα φόρτωσης εγγραφών");
    }
  };

  const renderSchedule = () => (
    <>
      <p className={styles.sectionLabel}>{config.eventDate}</p>
      {config.schedule.map((item, index) => {
        if (item.type === "break") {
          return (
            <div className={styles.card} key={`${item.time}-${item.title}`}>
              <div className={styles.breakRow}>{item.time} - {item.title}</div>
            </div>
          );
        }

        const target = item.speakerId
          ? () => openDetails("speaker", item.speakerId)
          : item.performerId
            ? () => openDetails("performer", item.performerId)
            : undefined;

        return (
          <div className={styles.card} key={`${item.time}-${item.title}`}>
            <button className={styles.talkRow} type="button" onClick={target}>
              <div className={styles.talkTime}>{item.time}</div>
              <div className={styles.talkBody}>
                <div className={styles.talkTitle}>
                  {item.title}
                  {index === nowIndex && <span className={styles.nowBadge}>ΤΩΡΑ</span>}
                </div>
                <div className={styles.talkSub}>
                  <span className={styles.avatar}>{item.initials}</span>
                  {item.speaker}
                </div>
                {item.tag && <div className={styles.tag}>{item.tag}</div>}
              </div>
            </button>
          </div>
        );
      })}
    </>
  );

  const renderGrid = (items, type) => (
    <div className={styles.grid}>
      {items.map((item) => (
        <button className={styles.speakerCard} type="button" key={item.id} onClick={() => openDetails(type, item.id)}>
          <div className={styles.speakerImage}>
            <PersonImage item={item} />
          </div>
          <div className={styles.speakerInfo}>
            <div className={styles.speakerName}>{item.name}</div>
            <div className={styles.speakerRole}>{item.role}</div>
            <div className={styles.tag}>{item.tag}</div>
          </div>
        </button>
      ))}
    </div>
  );

  const renderWorkshops = () => {
    const groups = [
      ["Professional", config.workshops.filter((workshop) => workshop.type === "pro")],
      ["Experience", config.workshops.filter((workshop) => workshop.type === "exp")],
    ];

    return groups.map(([label, workshops]) => (
      <div key={label}>
        <p className={styles.sectionLabel}>{label}</p>
        {workshops.map((workshop) => {
          const taken = counts[workshop.id] || 0;
          const available = Math.max(workshop.seats - taken, 0);
          const percent = Math.min(Math.round((taken / workshop.seats) * 100), 100);
          const full = available === 0;
          const low = available > 0 && available <= 5;
          const form = forms[workshop.id] || {};

          return (
            <div className={styles.workshopCard} key={workshop.id}>
              <button className={styles.workshopHead} type="button" onClick={() => setOpenWorkshop(openWorkshop === workshop.id ? null : workshop.id)}>
                <div>
                  <div className={styles.workshopTitle}>{workshop.name}</div>
                  <div className={styles.workshopMeta}>{workshop.time}</div>
                  <div className={classNames(styles.seats, full ? styles.seatsFull : low ? styles.seatsLow : styles.seatsOk)}>
                    {full ? "Πλήρης - Δεν υπάρχουν θέσεις" : `${available} / ${workshop.seats} θέσεις διαθέσιμες`}
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={classNames(styles.progressFill, full ? "" : low ? styles.progressWarn : styles.progressOk)}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
                <span className={classNames(styles.workshopBadge, workshop.type === "pro" ? styles.professional : styles.experience)}>
                  {workshop.typeLabel}
                </span>
              </button>

              {openWorkshop === workshop.id && (
                <div className={styles.workshopForm}>
                  <p className={styles.workshopDesc}>{workshop.desc}</p>
                  <label className={styles.fieldLabel}>Όνομα & Επώνυμο</label>
                  <input className={styles.input} value={form.name || ""} onChange={(event) => updateForm(workshop.id, "name", event.target.value)} placeholder="Ονοματεπώνυμο" maxLength={80} />
                  <label className={styles.fieldLabel}>Email</label>
                  <input className={styles.input} type="email" value={form.email || ""} onChange={(event) => updateForm(workshop.id, "email", event.target.value)} placeholder="email@example.com" />
                  <label className={styles.fieldLabel}>Αριθμός Εισιτηρίου</label>
                  <input className={styles.input} value={form.ticket || ""} onChange={(event) => updateForm(workshop.id, "ticket", event.target.value)} placeholder="π.χ. 1234" maxLength={20} />
                  <button className={styles.redButton} type="button" disabled={full || busyWorkshop === workshop.id} onClick={() => submitWorkshop(workshop)}>
                    {busyWorkshop === workshop.id ? "Αποθήκευση..." : "Κράτηση Θέσης"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    ));
  };

  const page = {
    schedule: renderSchedule(),
    speakers: (
      <>
        <p className={styles.sectionLabel}>Ομιλητές</p>
        {renderGrid(config.speakers, "speaker")}
      </>
    ),
    performers: (
      <>
        <p className={styles.sectionLabel}>Performances</p>
        {renderGrid(config.performers, "performer")}
      </>
    ),
    workshops: renderWorkshops(),
    sponsors: (
      <div className={styles.sponsorsPage}>
        <p className={styles.giveawaySub}>Δείτε τους χορηγούς μας:</p>
        <a className={styles.sponsorLink} href={asset("sponsors_banner-2026-v2.pdf")} target="_blank" rel="noreferrer">
          Άνοιγμα Sponsors PDF
        </a>
      </div>
    ),
    giveaway: (
      <>
        <div className={styles.giveawayHeader}>
          <div className={styles.giveawayIcon}>*</div>
          <div className={styles.giveawayTitle}>Giveaways</div>
          <div className={styles.giveawaySub}>Πατήστε σε κάθε giveaway για να συμμετάσχετε.</div>
        </div>
        {config.giveaways.map((giveaway) => (
          <div className={styles.giveawayCard} key={giveaway.id}>
            <div className={styles.giveawayBody}>
              <div className={styles.workshopTitle}>{giveaway.name}</div>
              <div className={styles.giveawaySub}>{giveaway.prize}</div>
            </div>
            <div className={styles.giveawayBody}>
              <button className={styles.redButton} type="button" onClick={() => window.open(giveaway.formUrl, "_blank", "noopener,noreferrer")}>
                Συμμετοχή
              </button>
            </div>
          </div>
        ))}
      </>
    ),
  };

  return (
    <div className={styles.phoneApp}>
      <div className={styles.desktopGate}>
        <img className={styles.logo} src={asset("logo.png")} alt="TEDxNTUA" />
        <h1>Phone only</h1>
        <p>This event app is designed only for mobile screens. Open it from your phone to use the full experience.</p>
      </div>

      <div className={styles.phoneFrame}>
        <header className={styles.header}>
          <div className={styles.headerRow}>
            <button className={styles.logoButton} type="button" onClick={handleLogoTap} aria-label="TEDxNTUA admin access">
              <img className={styles.logo} src={asset("logo.png")} alt="TEDxNTUA" />
            </button>
            <div className={styles.livePill}>
              <span className={styles.dot} />
              LIVE
            </div>
          </div>
        </header>

        <nav className={styles.tabs} aria-label="Event app sections">
          {tabs.map(([id, label]) => (
            <button key={id} className={classNames(styles.tab, activeTab === id && styles.activeTab)} type="button" onClick={() => setActiveTab(id)}>
              {label}
            </button>
          ))}
        </nav>

        <div className={styles.pages}>
          {tabs.map(([id]) => (
            <section key={id} className={classNames(styles.page, activeTab === id && styles.activePage)} aria-hidden={activeTab !== id}>
              {page[id]}
            </section>
          ))}
        </div>

        {showInstall && (
          <div className={styles.installBar}>
            <div className={styles.installText}>
              <b>Εγκαταστήστε την εφαρμογή</b>
              Γρήγορη πρόσβαση από το κινητό σας
            </div>
            <button className={styles.smallButton} type="button" onClick={runInstall}>Εγκατάσταση</button>
            <button className={styles.ghostButton} type="button" onClick={() => setShowInstall(false)} aria-label="Close install prompt">x</button>
          </div>
        )}
      </div>

      {modalItem && (
        <div className={styles.modalOverlay} onClick={() => setModalItem(null)}>
          <div className={styles.modalBox} onClick={(event) => event.stopPropagation()}>
            <div className={styles.modalHandle} />
            <div className={styles.modalImageWrap}>
              <PersonImage item={modalItem} large />
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalTag}>{modalItem.tag || (modalItem.type === "speaker" ? "Ομιλητής" : "Performance")}</div>
              <div className={styles.modalTitle}>{modalItem.name}</div>
              <div className={styles.modalSub}>{modalItem.role}</div>
              <div className={styles.modalDesc}>{modalItem.bio || modalItem.desc}</div>
            </div>
          </div>
        </div>
      )}

      {adminOpen && (
        <div className={styles.adminOverlay}>
          <div className={styles.adminHead}>
            <div className={styles.adminTitle}>Admin Panel</div>
            <button className={styles.ghostButton} type="button" onClick={() => { setAdminOpen(false); setAdminUnlocked(false); }}>
              Close
            </button>
          </div>

          {!adminUnlocked ? (
            <div className={styles.adminLock}>
              <h2>Admin Access</h2>
              <p className={styles.giveawaySub}>Εισάγετε τον κωδικό πρόσβασης</p>
              <input className={styles.adminInput} type="password" value={adminPass} onChange={(event) => setAdminPass(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") unlockAdmin(); }} placeholder="Κωδικός..." />
              <button className={styles.redButton} type="button" onClick={unlockAdmin}>Είσοδος</button>
            </div>
          ) : (
            <div className={styles.adminSection}>
              <h3>Workshop Εγγραφές</h3>
              {adminRows.length === 0 ? (
                <p className={styles.giveawaySub}>Δεν υπάρχουν εγγραφές ακόμα.</p>
              ) : (
                <div className={styles.tableWrap}>
                  <table className={styles.adminTable}>
                    <thead>
                      <tr><th>Workshop</th><th>Όνομα</th><th>Εισιτήριο</th><th>Email</th></tr>
                    </thead>
                    <tbody>
                      {adminRows.map((row, index) => (
                        <tr key={`${row.ticket}-${index}`}>
                          <td>{row.workshop_name}</td>
                          <td>{row.name}</td>
                          <td>{row.ticket}</td>
                          <td>{row.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className={classNames(styles.toast, toast && styles.toastOn)}>{toast}</div>
    </div>
  );
}
