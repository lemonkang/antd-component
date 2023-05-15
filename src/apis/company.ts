import request from "@apis/request/request";

export type ProductInfo = {
  hasStandardCards: boolean;
  hasBoosterCards: boolean;
  hasDebitCards: boolean;
  hasWallet: boolean;
  hasKCredit: boolean;
};

export const getProductInfo = async () => {
  return await request.get<ProductInfo>("/companies/general/product-info");
};
