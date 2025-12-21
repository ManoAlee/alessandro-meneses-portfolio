export type InteractionType = "hover" | "click" | "mount";

export interface PortfolioEventDetail {
  element: string;
  action: string;
  type: InteractionType;
}

export function dispatchPortfolioEvent(detail: PortfolioEventDetail) {
  const event = new CustomEvent<PortfolioEventDetail>("portfolio-interaction", {
    detail,
  });
  window.dispatchEvent(event);
}
