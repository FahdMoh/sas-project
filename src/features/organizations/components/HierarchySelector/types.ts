/**
 * Organizations feature types
 */
export interface Organization {
    id: string;
    name: string;
    parentId: string | null;
    level: number;
    children?: Organization[];
}

export interface HierarchyNode {
    id: string;
    name: string;
    level: number;
    parentId: string | null;
    children: HierarchyNode[];
}

export interface HierarchySelectorProps {
    value: string | null;
    onChange: (organizationId: string | null) => void;
    placeholder?: string;
    isDisabled?: boolean;
}

export interface SelectOption {
    value: string;
    label: string;
    level: number;
}
