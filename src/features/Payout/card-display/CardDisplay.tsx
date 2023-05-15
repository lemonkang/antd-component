import Style from "./style.module.scss";
import IconFont from "@components/IconFont/IconFont";
import utils from "@/utils";
import type { PayFromCard } from "@apis/payout";

type Props = {
  card: PayFromCard | undefined
  onClick: () => void
}

export function CardDisplay({ card, onClick }: Props) {

  return (
    <>
      {card ?
        <HaveCardDisplay card={card} onClick={onClick} />
        :
        <NoCardDisplay onClick={onClick} />
      }
    </>
  );
}


type TCardDisplay = {
  card: PayFromCard
  onClick: () => void
}

export function HaveCardDisplay({ card, onClick }: TCardDisplay) {
  return (
    <div className={Style.cardContainer} onClick={onClick}>
      <div className={"flex"}>
            <span className={"mr-4 w-8 h-8 rounded-full bg-gray-100 flex align-center justify-center"}>
              <IconFont type={"icon-card"} className={"text-lg text-gray-300"} />
            </span>
        <div>
          <div className={"font-bold-inter"}>{card.cardHolder}</div>
          <div className={"text-sm text-gray-400"}>{utils.dataFormat.formatCardNumber(card.cardNumber)}</div>
          <div className={"text-sm mt-3"}>{utils.currency.format(card.balance, { unit: true })}</div>
        </div>
      </div>
    </div>
  );
}

export function NoCardDisplay({ onClick }: { onClick: () => void }) {
  return (
    <div className={Style.emptyContainer} onClick={onClick}>
      <div className={Style.emptyInner}>
        <IconFont type={"icon-card"} className={"text-2xl mb-1 text-gray-300"} />
        <div className={"text-gray-400"}>Select a card</div>
      </div>
    </div>
  );
}