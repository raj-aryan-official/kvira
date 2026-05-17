export type School = { id: string; name: string; city: string; code: string };

export const MOCK_SCHOOLS: School[] = [
  { id: 's1', name: 'Delhi Public School', city: 'Bangalore', code: 'DPSB01' },
  { id: 's2', name: 'Kendriya Vidyalaya', city: 'Mumbai', code: 'KVMH02' },
  { id: 's3', name: 'Ryan International', city: 'Chennai', code: 'RYCH03' },
  { id: 's4', name: 'DAV Public School', city: 'Hyderabad', code: 'DAVH04' },
  { id: 's5', name: 'St. Mary\'s Convent', city: 'Kochi', code: 'STMK05' },
];

export const findSchools = (query: string): School[] => {
  const q = query.toLowerCase();
  return MOCK_SCHOOLS.filter(
    (s) => s.name.toLowerCase().includes(q) || s.city.toLowerCase().includes(q),
  );
};

export const findSchoolByCode = (code: string): School | undefined =>
  MOCK_SCHOOLS.find((s) => s.code === code.toUpperCase());
