// Jokhon live jaben, tokhon shudhu ei URL-ti bodle phelben
const BASE_URL = 'https://api.yourdomain.com/v1';

// Toggle Flag: true thakle mock data cholbe, false korle live API kaj korbe
const isMock = true; 

// Mock Data ekhanei thakbe
const MOCK_TEAM_MEMBERS = [
  'Sarah Johnson',
  'Michael Brown',
  'Emily Davis',
  'James Wilson',
  'Maria Garcia',
  'David Martinez',
  'Jennifer Lee',
  'William Thompson',
];

/**
 * Team members fetch korar main function
 * @returns Promise<string[]>
 */
export const getTeamMembers = async (): Promise<string[]> => {
  // --- MOCK MODE ---
  if (isMock) {
    // Real API-er moto ekti chotto artificial delay (300ms) dewa holo
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_TEAM_MEMBERS;
  }

  // --- LIVE MODE (Jokhon isMock = false hobe) ---
  const response = await fetch(`${BASE_URL}/team-members`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch team members: ${response.statusText}`);
  }

  const result = await response.json();
  return result.data; // Mone kori live backend theke { data: [...] } ashbe
};