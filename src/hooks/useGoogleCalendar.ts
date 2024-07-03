import { useEffect, useState } from "react";
import { event } from "../mock";

export const useGoogleCalendar = () => {
  const [tokenClient, setTokenClient] = useState<any>(null)

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

  return {handleCreateEvent}
}