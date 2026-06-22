import { useState } from "react";
import type { CaseData } from "../types/caseNote";
import { getCases } from "../services/caseListApiForLive";

export const useCaseList = (loginId: string) => {
  const [cases, setCases] = useState<CaseData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCases = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // API request helper function call kora holo loginId shoho
      const data = await getCases(loginId);
      setCases(data);
    } catch (err: any) {
      setError('Failed to fetch cases');
      console.error('Error fetching cases:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Baki helper functions gulo ager motoi thakbe ---

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