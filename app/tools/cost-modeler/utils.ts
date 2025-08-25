import type { Model, UnitType } from './types';
import { rawData } from '../../../lib/utils/llmPricing';

interface RawModelData {
    modelNameId: string;
    inputCost: string;
    outputCost: string;
    context: string;
}

const getProviderAndSeries = (id: string, name: string) => {
    let provider = "Unknown";
    let series = "Unknown";

    if (id.startsWith("openai/")) {
        provider = "OpenAI";
        if (id.includes("gpt-4o")) series = "GPT-4o";
        else if (id.includes("gpt-4")) series = "GPT-4";
        else if (id.includes("gpt-3.5")) series = "GPT-3.5";
        else if (id.includes("o1")) series = "O1";
        else if (id.includes("o3")) series = "O3";
        else if (id.includes("o4")) series = "O4";
        else if (id.includes("codex")) series = "Codex";
    } else if (id.startsWith("google/")) {
        provider = "Google";
        if (id.includes("gemini")) series = "Gemini";
        else if (id.includes("gemma")) series = "Gemma";
        else if (id.includes("palm-2")) series = "PaLM 2";
    } else if (id.startsWith("anthropic/")) {
        provider = "Anthropic";
        if (id.includes("claude-3.5")) series = "Claude 3.5";
        else if (id.includes("claude-3")) series = "Claude 3";
        else if (id.includes("claude-2")) series = "Claude 2";
        else if (id.includes("claude-instant")) series = "Claude Instant";
        else if (id.includes("claude-opus-4")) series = "Claude Opus 4";
        else if (id.includes("claude-sonnet-4")) series = "Claude Sonnet 4";
    } else if (id.startsWith("meta-llama/")) {
        provider = "Meta";
        if (id.includes("llama-3.3")) series = "Llama 3.3";
        else if (id.includes("llama-3.2")) series = "Llama 3.2";
        else if (id.includes("llama-3.1")) series = "Llama 3.1";
        else if (id.includes("llama-3")) series = "Llama 3";
        else if (id.includes("llama-2")) series = "Llama 2";
        else if (id.includes("llama-4")) series = "Llama 4";
        else if (id.includes("llama-guard")) series = "Llama Guard";
        else if (id.includes("codellama")) series = "CodeLlama";
    } else if (id.startsWith("mistralai/")) {
        provider = "Mistral";
        if (id.includes("mixtral")) series = "Mixtral";
        else if (id.includes("mistral-large")) series = "Mistral Large";
        else if (id.includes("mistral-medium")) series = "Mistral Medium";
        else if (id.includes("mistral-small")) series = "Mistral Small";
        else if (id.includes("mistral-tiny")) series = "Mistral Tiny";
        else if (id.includes("devstral")) series = "Devstral";
        else if (id.includes("codestral")) series = "Codestral";
        else if (id.includes("pixtral")) series = "Pixtral";
        else if (id.includes("ministral")) series = "Ministral";
        else if (id.includes("mistral-nemo")) series = "Mistral Nemo";
        else if (id.includes("saba")) series = "Saba";
    } else if (id.startsWith("gryphe/")) {
        provider = "Gryphe";
        if (id.includes("mythomax")) series = "MythoMax";
        else if (id.includes("mythomist")) series = "MythoMist";
    } else if (id.startsWith("microsoft/")) {
        provider = "Microsoft";
        if (id.includes("phi-3.5")) series = "Phi-3.5";
        else if (id.includes("phi-3")) series = "Phi-3";
        else if (id.includes("phi-4")) series = "Phi-4";
        else if (id.includes("wizardlm")) series = "WizardLM";
        else if (id.includes("mai-ds")) series = "MAI DS";
    } else if (id.startsWith("databricks/")) {
        provider = "Databricks";
        series = "DBRX";
    } else if (id.startsWith("nousresearch/")) {
        provider = "Nous";
        if (id.includes("hermes-2")) series = "Hermes 2";
        else if (id.includes("hermes-3")) series = "Hermes 3";
        else if (id.includes("capybara")) series = "Capybara";
    } else if (id.startsWith("openrouter/")) {
        provider = "OpenRouter";
        if (id.includes("cinematika")) series = "Cinematika";
        else if (id.includes("optimus")) series = "Optimus";
        else if (id.includes("quasar")) series = "Quasar";
        else if (id.includes("auto")) series = "Auto Router";
    } else if (id.startsWith("deepseek/")) {
        provider = "DeepSeek";
        if (id.includes("deepseek-r1")) series = "DeepSeek R1";
        else if (id.includes("deepseek-chat")) series = "DeepSeek V3";
        else if (id.includes("deepseek-prover")) series = "DeepSeek Prover";
        else if (id.includes("deepseek-coder")) series = "DeepSeek Coder";
    } else if (id.startsWith("sarvamai/")) {
        provider = "Sarvam AI";
        series = "Sarvam-M";
    } else if (id.startsWith("thedrummer/")) {
        provider = "TheDrummer";
        if (id.includes("valkyrie")) series = "Valkyrie";
        else if (id.includes("anubis")) series = "Anubis Pro";
        else if (id.includes("skyfall")) series = "Skyfall";
        else if (id.includes("unslopnemo")) series = "UnslopNemo";
        else if (id.includes("rocinante")) series = "Rocinante";
    } else if (id.startsWith("arcee-ai/")) {
        provider = "Arcee AI";
        if (id.includes("caller")) series = "Caller";
        else if (id.includes("spotlight")) series = "Spotlight";
        else if (id.includes("maestro")) series = "Maestro";
        else if (id.includes("virtuoso")) series = "Virtuoso";
        else if (id.includes("coder")) series = "Coder";
        else if (id.includes("arcee-blitz")) series = "Arcee Blitz";
    } else if (id.startsWith("inception/")) {
        provider = "Inception";
        series = "Mercury Coder";
    } else if (id.startsWith("opengvlab/")) {
        provider = "OpenGVLab";
        series = "InternVL3";
    } else if (id.startsWith("qwen/")) {
        provider = "Qwen";
        if (id.includes("qwen3")) series = "Qwen3";
        else if (id.includes("qwen2.5-vl")) series = "Qwen2.5 VL";
        else if (id.includes("qwen-vl")) series = "Qwen VL";
        else if (id.includes("qwen-turbo")) series = "Qwen-Turbo";
        else if (id.includes("qwen-plus")) series = "Qwen-Plus";
        else if (id.includes("qwen-max")) series = "Qwen-Max";
        else if (id.includes("qwq")) series = "QwQ";
        else if (id.includes("qwen-2.5-coder")) series = "Qwen2.5 Coder";
        else if (id.includes("qwen-2.5")) series = "Qwen2.5";
        else if (id.includes("qwen-2")) series = "Qwen 2";
        else if (id.includes("qwen-1.5")) series = "Qwen 1.5";
    } else if (id.startsWith("tngtech/")) {
        provider = "TNG";
        series = "DeepSeek R1T Chimera";
    } else if (id.startsWith("thudm/")) {
        provider = "THUDM";
        if (id.includes("glm-z1")) series = "GLM Z1";
        else if (id.includes("glm-4")) series = "GLM 4";
    } else if (id.startsWith("shisa-ai/")) {
        provider = "Shisa AI";
        series = "Shisa V2";
    } else if (id.startsWith("eleutherai/")) {
        provider = "EleutherAI";
        series = "Llemma";
    } else if (id.startsWith("alfredpros/")) {
        provider = "AlfredPros";
        series = "CodeLLaMa";
    } else if (id.startsWith("arliai/")) {
        provider = "ArliAI";
        series = "QwQ";
    } else if (id.startsWith("agentica-org/")) {
        provider = "Agentica";
        series = "Deepcoder";
    } else if (id.startsWith("moonshotai/")) {
        provider = "Moonshot AI";
        if (id.includes("kimi-vl")) series = "Kimi VL";
        else if (id.includes("moonlight")) series = "Moonlight";
    } else if (id.startsWith("x-ai/")) {
        provider = "xAI";
        series = "Grok";
    } else if (id.startsWith("nvidia/")) {
        provider = "NVIDIA";
        series = "Nemotron";
    } else if (id.startsWith("all-hands/")) {
        provider = "OpenHands";
        series = "OpenHands LM";
    } else if (id.startsWith("scb10x/")) {
        provider = "SCB10X";
        series = "Typhoon2";
    } else if (id.startsWith("featherless/")) {
        provider = "Featherless";
        series = "Qwerky";
    } else if (id.startsWith("open-r1/")) {
        provider = "Open R1";
        series = "OlympicCoder";
    } else if (id.startsWith("cohere/")) {
        provider = "Cohere";
        series = "Command";
    } else if (id.startsWith("rekaai/")) {
        provider = "Reka";
        series = "Flash";
    } else if (id.startsWith("perplexity/")) {
        provider = "Perplexity";
        series = "Sonar";
    } else if (id.startsWith("liquid/")) {
        provider = "Liquid";
        series = "LFM";
    } else if (id.startsWith("minimax/")) {
        provider = "MiniMax";
        series = "MiniMax-01";
    } else if (id.startsWith("sao10k/")) {
        provider = "Sao10K";
        if (id.includes("euryale")) series = "Euryale";
        else if (id.includes("lunaris")) series = "Lunaris";
        else if (id.includes("hanami")) series = "Hanami";
        else if (id.includes("fimbulvetr")) series = "Fimbulvetr";
        else if (id.includes("stheno")) series = "Stheno";
    } else if (id.startsWith("eva-unit-01/")) {
        provider = "EVA";
        series = "EVA";
    } else if (id.startsWith("raifle/")) {
        provider = "Raifle";
        series = "SorcererLM";
    } else if (id.startsWith("anthracite-org/")) {
        provider = "Anthracite";
        series = "Magnum";
    } else if (id.startsWith("inflection/")) {
        provider = "Inflection";
        series = "Inflection";
    } else if (id.startsWith("cognitivecomputations/")) {
        provider = "Cognitive Computations";
        series = "Dolphin";
    } else if (id.startsWith("sophosympatheia/")) {
        provider = "Sophosympatheia";
        series = "Midnight Rose";
    } else if (id.startsWith("alpindale/")) {
        provider = "Alpindale";
        series = "Goliath";
    } else if (id.startsWith("undi95/")) {
        provider = "UNDI95";
        if (id.includes("toppy")) series = "Toppy";
        else if (id.includes("remm")) series = "ReMM SLERP";
    } else if (id.startsWith("mancer/")) {
        provider = "Mancer";
        series = "Weaver";
    } else if (id.startsWith("jondurbin/")) {
        provider = "Jondurbin";
        if (id.includes("airoboros")) series = "Airoboros";
        else if (id.includes("bagel")) series = "Bagel";
    } else if (id.startsWith("recursal/")) {
        provider = "Recursal";
        series = "RWKV";
    } else if (id.startsWith("pygmalionai/")) {
        provider = "PygmalionAI";
        series = "Mythalion";
    } else if (id.startsWith("01-ai/")) {
        provider = "01.AI";
        series = "Yi";
    } else if (id.startsWith("liuhaotian/")) {
        provider = "Liu Haotian";
        series = "LLaVA";
    } else if (id.startsWith("allenai/")) {
        provider = "AllenAI";
        series = "OLMo";
    } else if (id.startsWith("snowflake/")) {
        provider = "Snowflake";
        series = "Arctic";
    } else if (id.startsWith("fireworks/")) {
        provider = "Fireworks";
        series = "FireLLaVA";
    } else if (id.startsWith("lynn/")) {
        provider = "Lynn";
        series = "Soliloquy";
    } else if (id.startsWith("huggingfaceh4/")) {
        provider = "Hugging Face";
        series = "Zephyr";
    } else if (id.startsWith("teknium/")) {
        provider = "Teknium";
        series = "OpenHermes";
    } else if (id.startsWith("open-orca/")) {
        provider = "OpenOrca";
        series = "Mistral OpenOrca";
    } else if (id.startsWith("xwin-lm/")) {
        provider = "Xwin-LM";
        series = "Xwin";
    } else if (id.startsWith("migtissera/")) {
        provider = "Migtissera";
        series = "Synthia";
    } else if (id.startsWith("phind/")) {
        provider = "Phind";
        series = "CodeLlama";
    } else if (id.startsWith("jebcarter/")) {
        provider = "Jeb Carter";
        series = "Psyfighter";
    } else if (id.startsWith("openchat/")) {
        provider = "OpenChat";
        series = "OpenChat";
    } else if (id.startsWith("intel/")) {
        provider = "Intel";
        series = "Neural Chat";
    } else if (id.includes("lzlv")) {
        provider = "Lizpreciatior";
        series = "lzlv";
    } else if (id.startsWith("tokyotech-llm/")) {
        provider = "TokyoTech-LLM";
        series = "Swallow";
    } else if (id.startsWith("inflatebot/")) {
        provider = "Inflatebot";
        series = "Mag Mell";
    } else if (id.startsWith("bigcode/")) {
        provider = "BigCode";
        series = "StarCoder2";
    } else if (id.startsWith("bytedance-research/")) {
        provider = "ByteDance";
        series = "UI-TARS";
    } else if (id.startsWith("steelskull/")) {
        provider = "SteelSkull";
        series = "Electra";
    } else if (id.startsWith("latitudegames/")) {
        provider = "LatitudeGames";
        series = "Wayfarer";
    } else if (id.startsWith("aion-labs/")) {
        provider = "AionLabs";
        series = "Aion";
    } else if (id.startsWith("aetherwiing/")) {
        provider = "Aetherwiing";
        series = "Starcannon";
    } else if (id.startsWith("infermatic/")) {
        provider = "Infermatic";
        series = "Mistral Nemo Inferor";
    } else if (id.startsWith("neversleep/")) {
        provider = "NeverSleep";
        series = "Lumimaid";
    }

    return { provider, series };
};

const parseRawData = (data: RawModelData[]): Model[] => {
    return data.map(item => {
        const [name, id] = item.modelNameId.split('\n');
        const inputCost = parseFloat(item.inputCost.replace('$', '')) / 1000000; // Convert to $/token
        const outputCost = parseFloat(item.outputCost.replace('$', '')) / 1000000; // Convert to $/token
        const contextLength = parseInt(item.context.replace(/,/g, ''));

        const { provider, series } = getProviderAndSeries(id, name);

        return {
            id: id.trim(),
            name: name.trim(),
            description: `Model from ${provider} in the ${series} series.`, // Generic description
            pricing: {
                prompt: isNaN(inputCost) ? "0" : inputCost.toString(),
                completion: isNaN(outputCost) ? "0" : outputCost.toString(),
                request: "0",
                image: "0"
            },
            context_length: contextLength,
            architecture: {
                modality: "text", // Default to text
                tokenizer: provider, // Use provider as tokenizer for now
                input_modalities: ["text"]
            },
            top_provider: { name: provider },
            series: series,
            categories: ["General"], // Default to general
            estimatedCost: 0
        };
    });
};

// --- DATA ---
export const modelsData: Model[] = [
    { "id": "openai/gpt-4o", "name": "OpenAI: GPT-4o", "description": "OpenAI's most advanced, multimodal model. It's faster, cheaper, and has a 128k context window.", "pricing": { "prompt": "0.000005", "completion": "0.000015", "request": "0", "image": "0.001275" }, "context_length": 128000, "architecture": { "modality": "multimodal", "tokenizer": "OpenAI", "input_modalities": ["text", "image"] }, "top_provider": { "name": "OpenAI"}, "series": "GPT", "categories": ["General", "Vision", "Code"], estimatedCost: 0 },
    { "id": "google/gemini-flash-1.5", "name": "Google: Gemini Flash 1.5", "description": "Google's fastest and most cost-effective model in the 1.5 generation.", "pricing": { "prompt": "0.00000035", "completion": "0.0000007", "request": "0", "image": "0" }, "context_length": 1048576, "architecture": { "modality": "multimodal", "tokenizer": "Google", "input_modalities": ["text", "image"] }, "top_provider": { "name": "Google"}, "series": "Gemini", "categories": ["General", "Vision"], estimatedCost: 0 },
    { "id": "google/gemini-pro-1.5", "name": "Google: Gemini Pro 1.5", "description": "Google's latest generation model for a balance of performance and cost.", "pricing": { "prompt": "0.0000035", "completion": "0.0000105", "request": "0", "image": "0" }, "context_length": 1048576, "architecture": { "modality": "multimodal", "tokenizer": "Google", "input_modalities": ["text", "image"] }, "top_provider": { "name": "Google"}, "series": "Gemini", "categories": ["General", "Vision", "Code"], estimatedCost: 0 },
    { "id": "anthropic/claude-3-opus", "name": "Anthropic: Claude 3 Opus", "description": "Anthropic's most powerful model, delivering state-of-the-art performance on highly complex tasks.", "pricing": { "prompt": "0.000015", "completion": "0.000075", "request": "0", "image": "0" }, "context_length": 200000, "architecture": { "modality": "multimodal", "tokenizer": "Anthropic", "input_modalities": ["text", "image"] }, "top_provider": { "name": "Anthropic"}, "series": "Claude", "categories": ["General", "Code"], estimatedCost: 0 },
    { "id": "anthropic/claude-3-sonnet", "name": "Anthropic: Claude 3 Sonnet", "description": "A balance of intelligence and speed for enterprise workloads.", "pricing": { "prompt": "0.000003", "completion": "0.000015", "request": "0", "image": "0" }, "context_length": 200000, "architecture": { "modality": "multimodal", "tokenizer": "Anthropic", "input_modalities": ["text", "image"] }, "top_provider": { "name": "Anthropic"}, "series": "Claude", "categories": ["General"], estimatedCost: 0 },
    { "id": "anthropic/claude-3-haiku", "name": "Anthropic: Claude 3 Haiku", "description": "Anthropic's fastest and most compact model for near-instant responsiveness.", "pricing": { "prompt": "0.00000025", "completion": "0.00000125", "request": "0", "image": "0" }, "context_length": 200000, "architecture": { "modality": "multimodal", "tokenizer": "Anthropic", "input_modalities": ["text", "image"] }, "top_provider": { "name": "Anthropic"}, "series": "Claude", "categories": ["General", "Fast"], estimatedCost: 0 },
    { "id": "meta-llama/llama-3-70b-instruct", "name": "Meta: Llama 3 70B Instruct", "description": "The 70B parameter, instruction-tuned version of Meta's Llama 3 model.", "pricing": { "prompt": "0.00000079", "completion": "0.00000279", "request": "0", "image": "0" }, "context_length": 8192, "architecture": { "modality": "text", "tokenizer": "Llama", "input_modalities": ["text"] }, "top_provider": { "name": "Meta"}, "series": "Llama", "categories": ["General", "Code", "Open Source"], estimatedCost: 0 },
    { "id": "mistralai/mistral-large", "name": "Mistral: Large", "description": "Mistral's flagship model, with top-tier reasoning capabilities.", "pricing": { "prompt": "0.000004", "completion": "0.000012", "request": "0", "image": "0" }, "context_length": 32000, "architecture": { "modality": "text", "tokenizer": "Mistral", "input_modalities": ["text"] }, "top_provider": { "name": "Mistral"}, "series": "Mistral", "categories": ["General", "Code"], estimatedCost: 0 },
    { "id": "mistralai/mixtral-8x22b-instruct", "name": "Mistral: Mixtral 8x22B", "description": "A high-performance sparse mixture-of-experts model from Mistral.", "pricing": { "prompt": "0.000002", "completion": "0.000006", "request": "0", "image": "0" }, "context_length": 64000, "architecture": { "modality": "text", "tokenizer": "Mistral", "input_modalities": ["text"] }, "top_provider": { "name": "Mistral"}, "series": "Mistral", "categories": ["General", "Open Source"], estimatedCost: 0 },
    { "id": "gryphe/mythomax-l2-13b", "name": "Gryphe: MythoMax L2 13B", "description": "A fine-tuned Llama-2 model with a focus on roleplaying and creative writing.", "pricing": { "prompt": "0.00000015", "completion": "0.00000015", "request": "0", "image": "0" }, "context_length": 8192, "architecture": { "modality": "text", "tokenizer": "Llama", "input_modalities": ["text"] }, "top_provider": { "name": "Gryphe"}, "series": "Llama", "categories": ["Roleplay", "Writing", "Open Source"], estimatedCost: 0 },
    { "id": "microsoft/phi-3-mini-128k-instruct", "name": "Microsoft: Phi-3 Mini", "description": "A powerful 3.8B parameter model by Microsoft, optimized for on-device and low-latency scenarios.", "pricing": { "prompt": "0.00000025", "completion": "0.0000005", "request": "0", "image": "0" }, "context_length": 128000, "architecture": { "modality": "text", "tokenizer": "Microsoft", "input_modalities": ["text"] }, "top_provider": { "name": "Microsoft"}, "series": "Phi", "categories": ["Small", "Fast", "Open Source"], estimatedCost: 0 },
    { "id": "databricks/dbrx-instruct", "name": "Databricks: DBRX Instruct", "description": "A large-scale mixture-of-experts model by Databricks, excelling at code and general tasks.", "pricing": { "prompt": "0.0000012", "completion": "0.0000012", "request": "0", "image": "0" }, "context_length": 32768, "architecture": { "modality": "text", "tokenizer": "Databricks", "input_modalities": ["text"] }, "top_provider": { "name": "Databricks"}, "series": "DBRX", "categories": ["Code", "General", "Open Source"], estimatedCost: 0 },
    { "id": "nousresearch/nous-hermes-2-mixtral-8x7b-dpo", "name": "Nous: Hermes 2 Mixtral", "description": "A DPO-tuned version of Mixtral 8x7B, excelling at reasoning and function calling.", "pricing": { "prompt": "0.0000006", "completion": "0.0000006", "request": "0", "image": "0" }, "context_length": 32000, "architecture": { "modality": "text", "tokenizer": "Mistral", "input_modalities": ["text"] }, "top_provider": { "name": "Nous"}, "series": "Hermes", "categories": ["Reasoning", "Code", "Open Source"], estimatedCost: 0 },
    { "id": "openrouter/cinematika-7b", "name": "OpenRouter: Cinematika 7B", "description": "A model fine-tuned for generating screenplays and movie scripts.", "pricing": { "prompt": "0.0000002", "completion": "0.0000002", "request": "0", "image": "0" }, "context_length": 8000, "architecture": { "modality": "text", "tokenizer": "Llama", "input_modalities": ["text"] }, "top_provider": { "name": "OpenRouter"}, "series": "Llama", "categories": ["Writing", "Roleplay", "Open Source"], estimatedCost: 0 },
    { "id": "google/gemma-2-9b-it", "name": "Google: Gemma 2 9B", "description": "Google's latest open model, with improved performance and a new architecture.", "pricing": { "prompt": "0.0000002", "completion": "0.0000002", "request": "0", "image": "0" }, "context_length": 8192, "architecture": { "modality": "text", "tokenizer": "Google", "input_modalities": ["text"] }, "top_provider": { "name": "Google"}, "series": "Gemma", "categories": ["General", "Open Source"], estimatedCost: 0 },
    ...parseRawData(rawData)
];

// --- UTILITY FUNCTIONS ---
export const formatCurrency = (amount: number): string => {
    if (amount < 0.01 && amount !== 0) { // Ensure 0 is formatted as $0.00
        return `$${amount.toPrecision(2)}`;
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

export const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`; // .toFixed(0) for whole numbers
    return num.toString();
};

export const calculateTokens = (value: number, unit: UnitType): number => {
    const WORDS_PER_PAGE = 450;
    const WORDS_PER_TOKEN_RATIO = 0.75;
    if (unit === 'words') {
        return Math.round(value / WORDS_PER_TOKEN_RATIO);
    } else if (unit === 'pages') {
        return Math.round((value * WORDS_PER_PAGE) / WORDS_PER_TOKEN_RATIO);
    } else if (unit === 'tokens') {
        return value;
    }
    return 0;
};
