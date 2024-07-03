import { useEffect, useState } from "react";
import { event } from "../mock";

export const useGoogleCalendar = () => {
  const [tokenClient, setTokenClient] = useState<any>(null)
  const [eventsList, setEventsList] = useState<Array<any>>([])

  useEffect(() => {
    if(gapi) {
      gapi.load("client", async function initializeGapiClient() {
        await gapi.client.init({
          apiKey: import.meta.env.VITE_APP_GC_API_KEY,
          discoveryDocs: [import.meta.env.VITE_APP_DISCOVERY_DOC],
        });
      })
    }
  }, [gapi])

  useEffect(() => {
    const myTokenClient = google.accounts.oauth2.initTokenClient({
      client_id: import.meta.env.VITE_APP_CLIENT_ID,
      scope: import.meta.env.VITE_APP_SCOPES,
      callback: (): void => {}, // defined later
    });
    setTokenClient(myTokenClient)
  }, [google])

  useEffect(() => {
    if(!tokenClient) return;
    handleListEvents()
  }, [tokenClient])

  async function createEvent() {
    let response: any;
    try {
      response = await gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event
      });
    } catch (err) {
      console.log('erro: ', err)
      return;
    }

    window.alert(`Evento criado com sucesso! ${response.result.htmlLink}`)
  }

  async function removeEvent(eventId: string) {
    let response: any;
    try {
      response = await gapi.client.calendar.events.delete({
        calendarId: 'primary',
        eventId: eventId
      })
    } catch (err) {
      console.log('erro: ', err)
      return;
    }

    window.alert(`Evento removido com sucesso!`)
  }

  async function listEvents() {
    let response: any;
    try {
      response = await gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      });
      console.log('response: ', response)
      const events = response.result.items
      if(!events || events.length === 0) {
        return []
      }
      return events
    }catch(err) {
      console.log('erro: ', err)
      return;
    }
  }

  function handleRemoveEvent(eventId: string) {
    tokenClient.callback = async (resp: any) => {
      if (resp.error !== undefined) {
        throw (resp);
      }
      await removeEvent(eventId);
    };

    if (gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({prompt: 'consent'});
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({prompt: ''});
    }
  }

  function handleCreateEvent() {
    tokenClient.callback = async (resp: any) => {
      if (resp.error !== undefined) {
        throw (resp);
      }
      await createEvent();
    };

    if (gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({prompt: 'consent'});
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({prompt: ''});
    }
  }

  function handleListEvents() {
    tokenClient.callback = async (resp: any) => {
      if (resp.error !== undefined) {
        throw (resp);
      }
      const events = await listEvents();
      return setEventsList(events)
    };

    if (gapi.client?.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({prompt: 'consent'});
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({prompt: ''});
    }
  }

  return {handleCreateEvent, handleRemoveEvent, handleListEvents, eventsList}
}