// import react from "react";

export default function CarSelection() {

    // TODO: get car details

    return (
        <div className="flex ">
            <div
                className="w-full p-6 my-6 mx-auto bg-white rounded-md shadow-2xl shadow-stone-300 lg:max-w-xl ">
                <div className="p-5">
                    <div className="block text-sm font-medium justify-end flex text-sky-500 mb-2">
                        <div className={'hover:text-sky-700 cursor-pointer'}>Change Selection</div>
                    </div>
                    <div className={'box-border border-inherit border-2 flex justify-center items-center'}>
                        <div>Picture of car here</div>
                    </div>
                    <div className="mb-2 text-2xl font-bold tracking-tight">From date - To date</div>
                    <div className="mb-3 font-normal text-gray-700 dark:text-gray-400 inline-block">
                        <div className={'flex'}>
                            <div className={'block mr-2 mb-2'}>Car detail 1</div>
                            <div className={'block mb-2 '}>Car detail 2</div>
                        </div>
                        <div className={'flex'}>
                            <div className={'block mr-2 mb-2'}>Car detail 3</div>
                            <div className={'block mb-2 '}>Car detail 4</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}