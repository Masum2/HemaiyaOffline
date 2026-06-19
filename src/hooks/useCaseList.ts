import { useState } from "react";
import type { CaseData } from "../types/caseNote";


// Mock data - replace with real API call
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

export const useCaseList = (loginId: string) => {
  const [cases, setCases] = useState<CaseData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCases = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // ✅ Mock API call - replace with your real API
      // const response = await fetch(`/api/cases?loginId=${loginId}`);
      // const data = await response.json();
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setCases(MOCK_CASES);
    } catch (err) {
      setError('Failed to fetch cases');
      console.error('Error fetching cases:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getCaseById = (caseName: string): CaseData | undefined => {
    return cases.find(c => c.caseName === caseName);
  };

  const getAllParents = (): string[] => {
    const allParents = cases.flatMap(c => c.parents || []);
    return [...new Set(allParents)].sort();
  };

  const getAllChildren = (): string[] => {
    const allChildren = cases.flatMap(c => c.children || []);
    return [...new Set(allChildren)].sort();
  };

  const getParentsByCase = (caseName: string): string[] => {
    const caseData = cases.find(c => c.caseName === caseName);
    return caseData?.parents || [];
  };

  const getChildrenByCase = (caseName: string): string[] => {
    const caseData = cases.find(c => c.caseName === caseName);
    return caseData?.children || [];
  };

  return { 
    cases, 
    isLoading, 
    error, 
    fetchCases, 
    getCaseById,
    getAllParents,
    getAllChildren,
    getParentsByCase,
    getChildrenByCase
  };
};