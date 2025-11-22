import { usePlayers } from "@/features/state/players-context"

type HeaderBarProps = {
  isSetupVisible: boolean;
  setIsSetupVisible: React.Dispatch<React.SetStateAction<boolean>>;
};


export function HeaderBar({ isSetupVisible, setIsSetupVisible }: HeaderBarProps) {
  const { resetPlayers } = usePlayers();
  function newGameBtnHandleClick() {
    setIsSetupVisible(!isSetupVisible);
  }

  async function deleteGameBtnHandleClick() {
    resetPlayers();
    location.reload();
  }
  
  return (
    //bg-[rgba(57,50,82,0.7)] // bg-[#9a61da]
    <header className="bg-[#552222B3] text-[#E4DCCF] flex items-center justify-between  py-2 px-3 shadow-md rounded-lg">
      <h1 className="text-lg font-semibold">Bloody Notes</h1>
      <div className="ml-auto flex flex-col sm:flex-row items-center gap-2 pl-2">
        <button onClick={deleteGameBtnHandleClick} className="bg-[#ee1717] hover:bg-[#880c0c] text-[#E4DCCF] rounded-md px-3 py-1 font-medium transition-colors whitespace-nowrap">
          Delete Game
        </button>
        <button onClick={newGameBtnHandleClick} className="bg-[#5B2A5E] hover:bg-[#5d3077] text-[#E4DCCF] rounded-md px-3 py-1 font-medium transition-colors whitespace-nowrap">
          New Game
        </button>
      </div>
    </header>
  );
}