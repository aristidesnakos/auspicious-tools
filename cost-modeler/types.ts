// --- TYPE DEFINITIONS ---
export interface ModelPricing {
    prompt: string;
    completion: string;
    request: string;
    image: string;
}

export interface ModelArchitecture {
    modality: string;
    tokenizer: string;
    input_modalities: string[];
}

export interface ModelTopProvider {
    name: string;
}

export interface Model {
    id: string;
    name: string;
    description: string;
    pricing: ModelPricing;
    context_length: number;
    architecture: ModelArchitecture;
    top_provider: ModelTopProvider;
    series: string;
    categories: string[];
    estimatedCost: number; 
}

export type UnitType = 'words' | 'pages' | 'tokens';

export interface FiltersState {
    context_length?: number[]; // Changed to number[] for slider range
    prompt_pricing?: number[]; // Changed to number[] for slider range
    provider?: string[];
    series?: string[];
    categories?: string[];
    [key: string]: string[] | number[] | undefined; // Allow for other string[] filters
}

export interface SortState {
    by: keyof Model | 'estimatedCost' | 'promptCost' | 'completionCost';
    order: 'asc' | 'desc';
}

export interface RangeOption {
    label: string;
    value: string;
}
