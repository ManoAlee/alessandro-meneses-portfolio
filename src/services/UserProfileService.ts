// Simulates a backend service for fetching user data
import { userData } from "../data/user";

export interface LinkedInProfile {
  connections: number;
  profileViews: number;
  lastPostViews: number;
  status: "ONLINE" | "OFFLINE" | "BUSY";
}

export const UserProfileService = {
  // Simulates an API call to LinkedIn
  syncWithLinkedIn: async (): Promise<LinkedInProfile> => {
    return new Promise((resolve) => {
      // Artistic start delay
      setTimeout(() => {
        resolve({
          connections: 1240, // Simulated update
          profileViews: 342,
          lastPostViews: 1205,
          status: "ONLINE"
        });
      }, 3000); // 3 seconds "Connecting"
    });
  }
};
