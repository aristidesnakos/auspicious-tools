"use client";

import React from 'react';
import type { Model } from '../types';
import { formatNumber } from '../utils';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';

interface ModelDetailModalProps {
    model: Model | null;
    onClose: () => void;
}

const ModelDetailModal: React.FC<ModelDetailModalProps> = ({ model, onClose }) => {
    return (
        <Dialog open={!!model} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{model?.name}</DialogTitle>
                </DialogHeader>
                {model && (
                    <div className="p-6 pt-0"> {/* Added pt-0 to remove top padding from DialogContent */}
                        <p className="text-slate-600 mb-6">{model.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
                            <div className="bg-slate-50 p-3 rounded-md">
                                <div className="text-slate-500 text-xs uppercase font-semibold">Input Cost</div>
                                <div className="text-slate-900 font-bold text-lg">${(parseFloat(model.pricing.prompt) * 1000000).toFixed(2)}/M</div>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-md">
                                <div className="text-slate-500 text-xs uppercase font-semibold">Output Cost</div>
                                <div className="text-slate-900 font-bold text-lg">${(parseFloat(model.pricing.completion) * 1000000).toFixed(2)}/M</div>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-md">
                                <div className="text-slate-500 text-xs uppercase font-semibold">Context Length</div>
                                <div className="text-slate-900 font-bold text-lg">{formatNumber(model.context_length)}</div>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-md">
                                <div className="text-slate-500 text-xs uppercase font-semibold">Provider</div>
                                <div className="text-slate-900 font-semibold">{model.top_provider.name}</div>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-md">
                                <div className="text-slate-500 text-xs uppercase font-semibold">Tokenizer</div>
                                <div className="text-slate-900 font-semibold">{model.architecture.tokenizer}</div>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-md">
                                <div className="text-slate-500 text-xs uppercase font-semibold">Series</div>
                                <div className="text-slate-900 font-semibold">{model.series}</div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h5 className="font-semibold text-slate-800 mb-2">Categories</h5>
                            <div className="flex flex-wrap gap-2">
                                {model.categories.map(cat => <span key={cat} className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{cat}</span>)}
                            </div>
                        </div>
                        <div className="mt-6 border-t border-slate-200 pt-4 text-xs text-slate-500">
                            Model ID: <code className="bg-slate-100 p-1 rounded">{model.id}</code>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ModelDetailModal;
