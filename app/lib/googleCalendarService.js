import { DateTime } from 'luxon';
import { EVENT_DATE, TIMEZONE, LOCATION } from './calendarData';

/**
 * Creates a single event in the user's Google Calendar.
 */
export async function createGoogleCalendarEvent(accessToken, item) {
  const startDateTime = DateTime.fromISO(`${EVENT_DATE}T${item.start}`, { zone: TIMEZONE });
  const endDateTime = DateTime.fromISO(`${EVENT_DATE}T${item.end}`, { zone: TIMEZONE });

  const description = [
    item.speaker ? `Speaker: ${item.speaker}` : '',
    item.description ? `About: ${item.description}` : '',
    `Type: ${item.type}`,
    '\nAdded via TEDxNTUA 2026 Website'
  ].filter(Boolean).join('\n');

  const event = {
    summary: `TEDxNTUA: ${item.title}`,
    location: LOCATION,
    description: description,
    start: {
      dateTime: startDateTime.toISO(),
      timeZone: TIMEZONE,
    },
    end: {
      dateTime: endDateTime.toISO(),
      timeZone: TIMEZONE,
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'popup', minutes: 30 },
        { method: 'popup', minutes: 5 },
      ],
    },
  };

  const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to create event');
  }

  return response.json();
}

/**
 * Checks if a TEDxNTUA event already exists to prevent duplicates.
 * Simple implementation: check if any event starts at the same time with the same title.
 */
export async function checkIfEventExists(accessToken, item) {
  const startDateTime = DateTime.fromISO(`${EVENT_DATE}T${item.start}`, { zone: TIMEZONE });
  const timeMin = startDateTime.toISO();
  const timeMax = startDateTime.plus({ minutes: 1 }).toISO();

  const url = new URL('https://www.googleapis.com/calendar/v3/calendars/primary/events');
  url.searchParams.append('timeMin', timeMin);
  url.searchParams.append('timeMax', timeMax);
  url.searchParams.append('q', `TEDxNTUA: ${item.title}`);

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) return false;

  const data = await response.json();
  return data.items && data.items.length > 0;
}
