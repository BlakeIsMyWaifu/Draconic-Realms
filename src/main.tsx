import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Mantine from './components/Mantine'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Mantine>
			<App />
		</Mantine>
	</React.StrictMode>
)
