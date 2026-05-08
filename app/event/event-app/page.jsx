"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { withBasePath } from "../../lib/basePath";
import { eventAppConfig as config } from "./eventAppData";
import styles from "./page.module.css";

const tabs = [
  ["schedule", "Program", "📅"],
  ["speakers", "Talks", "🎤"],
  ["performers", "Shows", "🎭"],
  ["workshops", "Labs", "⚙️"],
  ["sponsors", "Partners", "💎"],
  ["giveaway", "Wins", "🎁"],
];

const asset = (path) => withBasePath(`/event/eventApp/${path}`);
const photo = (file) => asset(`photos/${file}`);

function nowTime() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
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

export default function EventAppPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("schedule");
  const [currentTime, setCurrentTime] = useState(nowTime);
  const [modalItem, setModalItem] = useState(null);
  const [openWorkshop, setOpenWorkshop] = useState(null);
  const [toast, setToast] = useState("");
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);
  const toastTimer = useRef(null);
  const scrollContainerRef = useRef(null);

  const showToast = useCallback((message) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 2800);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => setCurrentTime(nowTime()), 60000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleBeforeInstall = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
      window.setTimeout(() => setShowInstall(true), 1200);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, 0);
    }
  }, [activeTab]);

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

  const renderSchedule = () => (
    <>
      <p className={styles.sectionLabel}>Πρόγραμμα • {config.eventDate}</p>
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
        <p className={styles.sectionLabel}>{label} Workshops</p>
        {workshops.map((workshop) => {
          return (
            <div className={styles.workshopCard} key={workshop.id}>
              <button className={styles.workshopHead} type="button" onClick={() => setOpenWorkshop(openWorkshop === workshop.id ? null : workshop.id)}>
                <div>
                  <div className={styles.workshopTitle}>{workshop.name}</div>
                  <div className={styles.workshopMeta}>{workshop.time}</div>
                </div>
                <span className={classNames(styles.workshopBadge, workshop.type === "pro" ? styles.professional : styles.experience)}>
                  {workshop.typeLabel}
                </span>
              </button>

              {openWorkshop === workshop.id && (
                <div className={styles.workshopForm}>
                  <p className={styles.workshopDesc}>{workshop.desc}</p>
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
          <div className={styles.giveawayIcon}>🎁</div>
          <div className={styles.giveawayTitle}>Exclusive Giveaways</div>
          <div className={styles.giveawaySub}>Συμπληρώστε τη φόρμα για να μπείτε στην κλήρωση!</div>
        </div>
        <div style={{ padding: '0 4px' }}>
          {config.giveaways.map((giveaway) => (
            <div className={styles.giveawayCard} key={giveaway.id}>
              <div className={styles.giveawayBadge}>Entry Open</div>
              <div className={styles.giveawayBody}>
                <div className={styles.giveawayBrand}>{giveaway.name}</div>
                <div className={styles.giveawayPrize}>{giveaway.prize}</div>
              </div>
              <div className={styles.giveawayFooter}>
                <button className={styles.redButton} type="button" onClick={() => window.open(giveaway.formUrl, "_blank", "noopener,noreferrer")}>
                  Δήλωση Συμμετοχής
                </button>
              </div>
            </div>
          ))}
        </div>
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
            <button className={styles.logoButton} type="button" onClick={() => router.push("/")} aria-label="Go to home page">
              <img className={styles.logo} src={asset("logo.png")} alt="TEDxNTUA" />
            </button>
            <div className={styles.livePill}>
              <span className={styles.dot} />
              LIVE
            </div>
          </div>
        </header>

        <nav className={styles.tabs} aria-label="Event app sections">
          {tabs.map(([id, label, icon]) => (
            <button 
              key={id} 
              className={classNames(styles.tab, activeTab === id && styles.activeTab)} 
              type="button" 
              onClick={() => setActiveTab(id)}
            >
              <span className={styles.tabIcon}>{icon}</span>
              <span className={styles.tabLabel}>{label}</span>
            </button>
          ))}
        </nav>

        <div className={styles.pages} ref={scrollContainerRef}>
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

      <div className={classNames(styles.toast, toast && styles.toastOn)}>{toast}</div>
    </div>
  );
}
