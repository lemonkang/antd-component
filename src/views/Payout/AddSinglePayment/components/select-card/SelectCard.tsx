import type { PayFromCard } from "@apis/payout";
import { CardDisplay } from "@/features/Payout/card-display/CardDisplay";

type Props = {
  value?: PayFromCard | undefined
  onChange?: (card: PayFromCard) => void
}

export function SelectCard({ value, onChange }: Props) {

  // todo:cardList drawer(wait ui)
  const showCardList = () => {
    console.log("open card list dialog");
    console.log("if select card,call handleSelect fn");
  };
  return <CardDisplay card={value} onClick={showCardList} />;
}