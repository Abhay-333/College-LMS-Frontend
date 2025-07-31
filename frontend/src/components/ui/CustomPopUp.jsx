import * as AlertDialog from "@radix-ui/react-alert-dialog";

const CustomAlertDialog = ({ message, onClose }) => {
  const capitalCase = message
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <AlertDialog.Root open={open} onOpenChange={onClose}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 z-40" />
        <AlertDialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-800 text-white p-6 rounded-lg w-[350px] shadow-lg">
          <AlertDialog.Title className="text-lg font-medium mb-2">
            Alert
          </AlertDialog.Title>
          <AlertDialog.Description className="mb-4 text-sm">
            {capitalCase}
          </AlertDialog.Description>
          <div className="flex justify-end gap-4">
            <AlertDialog.Cancel asChild>
              <button className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
                onClick={onClose}
              >
                OK
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default CustomAlertDialog;
