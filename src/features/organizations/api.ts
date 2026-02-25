import { USE_MOCK_API } from '@/config/env';
import { httpClient } from '@/shared/lib/http/axios';
import type { Organization } from './types';

// ---------------------------------------------------------------------------
// Mock data — 5 objects covering varying hierarchy depths for thorough testing
// ---------------------------------------------------------------------------
const MOCK_SENDER_ORGS: Organization[] = [
    {
        id: 's1',
        name: 'Alpha Corp – Finance – Audit – Internal – Compliance',
        entity_name: 'Alpha Corporation',
        department_name: 'Finance',
        section_name: 'Audit',
        unit_name: 'Internal Audit',
        sub_unit_name: 'Compliance',
        logo: '',
    },
    {
        id: 's2',
        name: 'Alpha Corp – Finance – Tax',
        entity_name: 'Alpha Corporation',
        department_name: 'Finance',
        section_name: 'Tax',
        unit_name: '',
        sub_unit_name: '',
        logo: '',
    },
    {
        id: 's3',
        name: 'Alpha Corp – IT',
        entity_name: 'Alpha Corporation',
        department_name: 'Information Technology',
        section_name: '',
        unit_name: '',
        sub_unit_name: '',
        logo: '',
    },
    {
        id: 's4',
        name: 'Beta Industries – HR – Recruitment – Sourcing',
        entity_name: 'Beta Industries',
        department_name: 'Human Resources',
        section_name: 'Recruitment',
        unit_name: 'Sourcing',
        sub_unit_name: '',
        logo: '',
    },
    {
        id: 's5',
        name: 'Gamma Solutions',
        entity_name: 'Gamma Solutions',
        department_name: '',
        section_name: '',
        unit_name: '',
        sub_unit_name: '',
        logo: '',
    },
];

const MOCK_RECEIVED_ORGS: Organization[] = [
    {
        id: 'r1',
        name: 'Delta Gov – Operations – Procurement – Direct',
        entity_name: 'Delta Government',
        department_name: 'Operations',
        section_name: 'Procurement',
        unit_name: 'Direct Purchasing',
        sub_unit_name: '',
        logo: '',
    },
    {
        id: 'r2',
        name: 'Delta Gov – Operations – Procurement – Tender – Main',
        entity_name: 'Delta Government',
        department_name: 'Operations',
        section_name: 'Procurement',
        unit_name: 'Tender Unit',
        sub_unit_name: 'Main Tender',
        logo: '',
    },
    {
        id: 'r3',
        name: 'Delta Gov – Legal',
        entity_name: 'Delta Government',
        department_name: 'Legal Affairs',
        section_name: '',
        unit_name: '',
        sub_unit_name: '',
        logo: '',
    },
    {
        id: 'r4',
        name: 'Epsilon Corp – Finance – Budget',
        entity_name: 'Epsilon Corp',
        department_name: 'Finance',
        section_name: 'Budget Control',
        unit_name: '',
        sub_unit_name: '',
        logo: '',
    },
    {
        id: 'r5',
        name: 'Epsilon Corp – IT – Support – Help Desk – Tier 1',
        entity_name: 'Epsilon Corp',
        department_name: 'IT',
        section_name: 'Support',
        unit_name: 'Help Desk',
        sub_unit_name: 'Tier 1',
        logo: '',
    },
];

// ---------------------------------------------------------------------------
// API functions
// ---------------------------------------------------------------------------

/** Fetch the organizations the current user can send FROM. */
export const getSenderOrganizations = async (): Promise<Organization[]> => {
    if (USE_MOCK_API) {
        return new Promise((resolve) =>
            setTimeout(() => resolve(MOCK_SENDER_ORGS), 500)
        );
    }
    const { data } = await httpClient.get<Organization[]>('/organizations/me/');
    return data;
};

/** Fetch the organizations available as recipients. */
export const getReceivedOrganizations = async (): Promise<Organization[]> => {
    if (USE_MOCK_API) {
        return new Promise((resolve) =>
            setTimeout(() => resolve(MOCK_RECEIVED_ORGS), 500)
        );
    }
    const { data } = await httpClient.get<Organization[]>('/organizations/recived/');
    return data;
};
