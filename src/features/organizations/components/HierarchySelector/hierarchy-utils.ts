import type { HierarchyNode, SelectOption } from './types';

/**
 * Flatten a hierarchical tree into a flat array of select options.
 * Indent labels by level so the hierarchy is visible in the dropdown.
 */
export const flattenHierarchy = (
    nodes: HierarchyNode[],
    depth = 0
): SelectOption[] => {
    const result: SelectOption[] = [];
    for (const node of nodes) {
        result.push({
            value: node.id,
            label: `${'  '.repeat(depth)}${node.name}`,
            level: node.level,
        });
        if (node.children?.length) {
            result.push(...flattenHierarchy(node.children, depth + 1));
        }
    }
    return result;
};

/**
 * Find a node anywhere in the tree by id.
 */
export const findNodeById = (
    nodes: HierarchyNode[],
    id: string
): HierarchyNode | null => {
    for (const node of nodes) {
        if (node.id === id) return node;
        if (node.children?.length) {
            const found = findNodeById(node.children, id);
            if (found) return found;
        }
    }
    return null;
};

/**
 * Filter nodes whose name matches the search term (case-insensitive).
 */
export const filterHierarchy = (
    nodes: HierarchyNode[],
    search: string
): HierarchyNode[] => {
    const lower = search.toLowerCase();
    return nodes.reduce<HierarchyNode[]>((acc, node) => {
        const filteredChildren = filterHierarchy(node.children ?? [], search);
        if (node.name.toLowerCase().includes(lower) || filteredChildren.length) {
            acc.push({ ...node, children: filteredChildren });
        }
        return acc;
    }, []);
};
