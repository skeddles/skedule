import '../css/ThemeSelector.css'

export default function ThemeSelector({theme, setTheme}: {theme: string, setTheme: Function}) {
	return (<div className="ThemeSelector">
		<button className={"theme-blue" + (theme==='blue'?' selected':'')} onClick={()=>setTheme('blue')}></button>
		<button className={"theme-green" + (theme==='green'?' selected':'')} onClick={()=>setTheme('green')}></button>
		<button className={"theme-red" + (theme==='red'?' selected':'')} onClick={()=>setTheme('red')}></button>
		<button className={"theme-black" + (theme==='black'?' selected':'')} onClick={()=>setTheme('black')}></button>
		<button className={"theme-gray" + (theme==='gray'?' selected':'')} onClick={()=>setTheme('gray')}></button>
		<button className={"theme-white" + (theme==='white'?' selected':'')} onClick={()=>setTheme('white')}></button>
	</div>)
}