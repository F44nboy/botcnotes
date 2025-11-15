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
    <header className="bg-[#552222B3] text-[#E4DCCF] flex items-center justify-between  py-2 shadow-md rounded-lg">
      <h1 className="opacity-100 pl-2 text-lg font-semibold">Bloody Notes</h1>
      <div className="ml-auto flex items-center gap-3 pr-4">
        <button onClick={deleteGameBtnHandleClick} className="bg-[#ee1717] hover:bg-[#880c0c] text-[#E4DCCF] rounded-md mx-4 px-3 py-1 font-medium transition-colors">
          Delete Game
        </button>
        <button onClick={newGameBtnHandleClick} className="bg-[#5B2A5E] hover:bg-[#5d3077] text-[#E4DCCF] rounded-md mx-4 px-3 py-1 font-medium transition-colors">
          New Game
        </button>
      </div>
    </header>
  );
}