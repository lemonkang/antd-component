import { atom } from "jotai";
import type { ProductInfo } from "@apis/company";

export const productInfo = atom<ProductInfo | undefined>(undefined);
