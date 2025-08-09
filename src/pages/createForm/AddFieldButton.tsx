import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/Button";
import type { FieldType } from "../../lib/types/form";

interface AddFieldButtonProps {
  addFieldByType: (type: FieldType[number]) => void;
}

const AddFieldButton: React.FC<AddFieldButtonProps> = ({ addFieldByType }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Add field</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {[
          "text",
          "checkbox",
          "radio",
          "select",
          "textarea",
          "number",
          "date",
        ].map((ele) => (
          <DropdownMenuItem
            key={ele}
            onClick={() => addFieldByType(ele)}
            className="capitalize"
          >
            {ele}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AddFieldButton;
