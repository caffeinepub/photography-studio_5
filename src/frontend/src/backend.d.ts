import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Email = string;
export type Timestamp = bigint;
export type PortfolioCategory = {
    __kind__: "landscapes";
    landscapes: null;
} | {
    __kind__: "commercial";
    commercial: null;
} | {
    __kind__: "other";
    other: string;
} | {
    __kind__: "events";
    events: null;
} | {
    __kind__: "weddings";
    weddings: null;
} | {
    __kind__: "portraits";
    portraits: null;
};
export interface ContactSubmission {
    name: string;
    email: Email;
    message: string;
    timestamp: Timestamp;
}
export interface PortfolioItem {
    title: string;
    createdAt: Timestamp;
    description: string;
    updatedAt: Timestamp;
    category: PortfolioCategory;
    image: Image;
}
export type Image = Uint8Array;
export interface AboutSection {
    bio: string;
    tagline: string;
    lastUpdated: Timestamp;
    portraitImage: Image;
}
export interface ServicePackage {
    features: Array<string>;
    name: string;
    createdAt: Timestamp;
    description: string;
    updatedAt: Timestamp;
    price: Price;
}
export type Price = string;
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createPortfolioItem(title: string, category: string, description: string, image: Image): Promise<bigint>;
    createServicePackage(name: string, description: string, price: Price, features: Array<string>): Promise<bigint>;
    deletePortfolioItem(id: bigint): Promise<void>;
    deleteServicePackage(id: bigint): Promise<void>;
    getAboutSection(): Promise<AboutSection | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContactSubmissions(): Promise<Array<ContactSubmission>>;
    getContactSubmissionsCount(): Promise<bigint>;
    getPortfolioCount(): Promise<bigint>;
    getPortfolioItem(id: bigint): Promise<PortfolioItem | null>;
    getPortfolioItems(): Promise<Array<PortfolioItem>>;
    getPortfolioItemsByCategory(category: PortfolioCategory): Promise<Array<PortfolioItem>>;
    getServicePackage(id: bigint): Promise<ServicePackage | null>;
    getServicePackages(): Promise<Array<ServicePackage>>;
    getServicePackagesCount(): Promise<bigint>;
    isCallerAdmin(): Promise<boolean>;
    submitContactForm(name: string, email: Email, message: string): Promise<void>;
    updateAboutSection(bio: string, tagline: string, portraitImage: Image): Promise<void>;
    updatePortfolioItem(id: bigint, updated: PortfolioItem): Promise<void>;
    updateServicePackage(id: bigint, updated: ServicePackage): Promise<void>;
}
