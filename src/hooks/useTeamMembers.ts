import { useState, useEffect } from 'react';

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

export const useTeamMembers = (isOnline: boolean) => {
  const [members, setMembers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOnline) {
      fetchTeamMembers();
    }
  }, [isOnline]);

  const fetchTeamMembers = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      setMembers(MOCK_TEAM_MEMBERS);
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { members, isLoading, fetchTeamMembers };
};