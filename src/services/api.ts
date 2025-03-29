import { Event } from "@/types/events";

const API_URL =
  "https://uchronianh-g4bxcccwbqf8dmhe.francecentral-01.azurewebsites.net";

export const fetchInitialEvents = async (): Promise<Event[]> => {
  try {
    const response = await fetch(`${API_URL}/get_initial_events`);
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

interface UpdateEventsPayload {
  events: Event[];
  option_chosen: string;
  model: string;
  temperature: number;
}

export const updateEvents = async (
  payload: UpdateEventsPayload
): Promise<Event[]> => {
  try {
    const response = await fetch(`${API_URL}/update_events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to update events");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating events:", error);
    throw error;
  }
};
