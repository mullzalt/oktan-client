import { Announcement, AssignmentInd, CreditCard, Dashboard, HistoryEdu, LocalLibrary, MilitaryTech, Newspaper, Note, People, Person, RequestPage } from '@mui/icons-material'
import { Divider, ListItem, ListSubheader, Typography } from '@mui/material'
import ListItemLink from '../../components/Navigation/ListItemLink'

const sideBarList = {
  admin: 
  <>
        <ListItemLink to='/dashboard' primary='Dashboard' icon={<Dashboard/>} />
        <Divider/>

        <ListSubheader>User Management</ListSubheader>
 
        <ListItemLink to='/admin/users' primary='Users' icon={<People/>}  />
        <ListItemLink to='/moderator/members' primary='Members' icon={<AssignmentInd/>}  />
        <Divider/>
        
        <ListSubheader>Competitions Management</ListSubheader>
        <ListItemLink to='/moderator/competitions' primary='Competitions' icon={<MilitaryTech/>}  />
        <ListItemLink to='/moderator/competitions' primary='Papers' icon={<HistoryEdu/>}  />
        <ListItemLink to='/moderator/cbts' primary='CBT' icon={<LocalLibrary/>}  />
        <ListItemLink to='/moderator/cbts' primary='CBT Token Request' icon={<Note/>}  />
      
        <ListSubheader>Payments Management</ListSubheader>
        <ListItemLink to='/moderator/invoices' primary='Payment Log' icon={<CreditCard/>}  />

        <ListSubheader>Broadcast</ListSubheader>
        <ListItemLink to='/moderator/invoices' primary='News' icon={<Newspaper/>}  />
        <ListItemLink to='/moderator/invoices' primary='Announcement' icon={<Announcement/>}  />
    </>,
    
  panitia: 
    <>
        <ListItemLink to='/' primary='Dashboard' />
        <ListItemLink to='/home' primary='home'  />
    </>,
  
  peserta: 
    <>
        <ListItemLink to='/dashboard' primary='Dashboard' icon={<Dashboard/>} />
        <Divider/>
        <ListSubheader>Competitions</ListSubheader>
        <ListItemLink to='/cbts' primary='CBT' icon={<LocalLibrary/>}  />
    </>,
  
  
}

export default sideBarList