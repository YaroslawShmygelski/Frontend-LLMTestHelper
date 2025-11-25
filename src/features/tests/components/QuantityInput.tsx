import { TEST_MAX_RUNS } from '@/utils/constants';
import { FiMinus, FiPlus, FiSettings } from 'react-icons/fi';

export interface QuantityInputProps {
  value: number | '';
  onChange: (newValue: number | '') => void;
}
const TEST_MIN_RUNS = 1;
export const QuantityInput = ({ value, onChange }: QuantityInputProps) => {
  const handleIncrement = () => {
    const current = typeof value === 'number' ? value : TEST_MIN_RUNS;
    const newVal = Math.min(current + 1, 200);
    onChange(newVal);
  };

  const handleDecrement = () => {
    const current = typeof value === 'number' ? value : TEST_MIN_RUNS;
    const newVal = Math.max(current - 1, TEST_MIN_RUNS);
    onChange(newVal);
  };

  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      onChange('');
      return;
    }
    const num = parseInt(val);
    if (!isNaN(num)) {
      if (num <= TEST_MAX_RUNS) onChange(num);
    }
  };

  const handleQtyBlur = () => {
    if (value === '' || value < TEST_MIN_RUNS) {
      onChange(1);
    }
  };
  return (
    <div className="w-full bg-card rounded-xl border-2 border-card-foreground/10 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-card-foreground/20">
      <div className="flex flex-col gap-2">
        <span className="w-fit text-xs font-bold text-card-foreground/50 uppercase tracking-wider bg-card-foreground/5 px-2.5 py-1 rounded-md">
          Select how many times you want to generate/solve this test.
        </span>

        <h3 className="text-xl font-bold text-card-foreground flex items-center gap-2">
          <FiSettings className="opacity-70" />
          Test Runs / Copies
        </h3>
      </div>
      <div className="flex items-center gap-1 bg-background/50 p-1.5 rounded-xl border border-card-foreground/5 shadow-sm">
        <button
          onClick={handleDecrement}
          disabled={value === TEST_MIN_RUNS}
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-card border border-card-foreground/10 hover:bg-muted hover:border-primary/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed text-card-foreground active:scale-95"
        >
          <FiMinus size={16} />
        </button>
        <div className="relative w-16 h-10">
          <input
            type="number"
            value={value}
            onChange={handleQtyChange}
            onBlur={handleQtyBlur}
            className="w-full h-full text-center bg-transparent font-black text-xl text-card-foreground outline-none border-none p-0 
        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
        <button
          onClick={handleIncrement}
          disabled={value === TEST_MAX_RUNS}
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-card border border-card-foreground/10 hover:bg-muted hover:border-primary/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed text-card-foreground active:scale-95"
        >
          <FiPlus size={16} />
        </button>
      </div>
    </div>
  );
};
