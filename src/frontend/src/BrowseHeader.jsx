import LoginButton from './LoginButton.jsx'
import SearchBox from './SearchBox.jsx'

export default function BrowseHeader(){

    return(
        
        <nav className="mx-auto flex items-center justify-between p-6 bg-slate-300" aria-label="Global">
            <div className='p-4'>
                <h1 className="text-2xl font-bold text-black">Rentals.co</h1>
            </div>
            <div className="flex-grow flex items-center justify-center">
                <SearchBox />
            </div>
            <div className="p-4">
                <LoginButton />
            </div>
        </nav>

    );

}