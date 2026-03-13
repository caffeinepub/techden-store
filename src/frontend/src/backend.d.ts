import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface GpuType {
    id: bigint;
    tdp: bigint;
    performanceRating: number;
    name: string;
    vram: string;
    description: string;
    series: string;
    imageUrl: string;
    isFeatured: boolean;
    brand: string;
    price: bigint;
    releaseYear: bigint;
    condition: string;
}
export interface backendInterface {
    addGpu(name: string, brand: string, series: string, vram: string, price: bigint, condition: string, performanceRating: number, description: string, releaseYear: bigint, tdp: bigint, imageUrl: string): Promise<bigint>;
    getFeaturedGpus(): Promise<Array<GpuType>>;
    getGpu(id: bigint): Promise<GpuType | null>;
    getGpus(): Promise<Array<GpuType>>;
    removeGpu(id: bigint): Promise<boolean>;
    toggleFeatured(id: bigint): Promise<boolean>;
    updateGpu(id: bigint, name: string, brand: string, series: string, vram: string, price: bigint, condition: string, performanceRating: number, description: string, releaseYear: bigint, tdp: bigint, imageUrl: string): Promise<boolean>;
    verifyAdminPassword(password: string): Promise<boolean>;
}
