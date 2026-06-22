import type { CaseData } from "../types/caseNote";

// Jokhon live jaben, tokhon shudhu ei URL-ti bodle phelben
const BASE_URL = 'https://api.yourdomain.com/v1';

// Toggle Flag: true thakle mock data cholbe, false korle live API kaj korbe
const isMock = true; 

// Mock Data ekhanei thakbe
const MOCK_CASES: CaseData[] = [
  {
    id: '1',
    caseName: 'CASE-2024-001',
    parents: ['John Doe', 'Jane Doe', 'Robert Doe'],
    children: ['Tommy Doe', 'Sarah Doe', 'Emily Doe'],
    isGroup: false,
  },
  {
    id: '2',
    caseName: 'CASE-2024-002',
    parents: ['Michael Smith', 'Jessica Smith'],
    children: ['Emma Smith'],
    isGroup: false,
  },
  {
    id: '3',
    caseName: 'GROUP-CASE-2024-003',
    parents: ['Parent A', 'Parent B', 'Parent C'],
    children: ['Child 1', 'Child 2', 'Child 3', 'Child 4'],
    isGroup: true,
  },
  {
    id: '4',
    caseName: 'CASE-2024-004',
    parents: ['Robert Johnson'],
    children: ['Alice Johnson', 'Bob Johnson', 'Charlie Johnson'],
    isGroup: false,
  },
  {
    id: '5',
    caseName: 'CASE-2024-005',
    parents: ['David Wilson', 'Sarah Wilson'],
    children: ['Mike Wilson'],
    isGroup: false,
  },
];

/**
 * Login ID er upor base kore cases fetch korar function
 * @param loginId string
 * @returns Promise<CaseData[]>
 */
export const getCases = async (loginId: string): Promise<CaseData[]> => {
  // --- MOCK MODE ---
  if (isMock) {
    // 500ms er artificial delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_CASES;
  }

  // --- LIVE MODE (Jokhon isMock = false hobe) ---
  const response = await fetch(`${BASE_URL}/cases?loginId=${loginId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Projon hole ekhane Auth token dite paren
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch cases: ${response.statusText}`);
  }

  const result = await response.json();
  return result.data; // Dhore neya hoyeche backend response { data: [...] } format-e ashbe
};