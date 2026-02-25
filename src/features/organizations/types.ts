/**
 * Organizations feature types
 */

/** Flat organization object as returned by the API */
export interface Organization {
    id: string;
    name: string;
    entity_name: string;
    department_name: string;
    section_name: string;
    unit_name: string;
    sub_unit_name: string;
    logo: string;
}

/** The ordered hierarchy sequence from broadest → most specific */
export const HIERARCHY_LEVELS = [
    'entity_name',
    'department_name',
    'section_name',
    'unit_name',
    'sub_unit_name',
] as const;

/** Union of valid hierarchy level keys */
export type HierarchyKey = (typeof HIERARCHY_LEVELS)[number];
