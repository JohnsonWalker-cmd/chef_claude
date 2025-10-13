import ChefIcon from '../assets/images/chef-claude-icon.png'

export default function Header(){
    return (
        <header>
            <div className='chef-icon_container'>
                <img src={ChefIcon} alt="Chef icon"/>
            </div>
            <h1>Chef Claude</h1>
        </header>
    )
}