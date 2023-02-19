import React, {useState, useEffect} from 'react'
import SoftButton from 'components/SoftButton';
import CreateTemplate from './CreateTemplate';
import Templates from './Templates';
import TokensTable from './TokensTable';
import EditTemplate from './EditTemplate';

const DetailsBody = ({ Project, setIsLoaded }) => {
    const [CreateTemplateEnabled, setCreateTemplateEnabled] = useState(false);
    const [EditTemplateEnabled, setEditTemplateEnabled] = useState(false);
    const [TemplateToEdit, setTemplateToEdit] = useState(null);

    const handleEditTemplate = (template) => {
        setTemplateToEdit(template);
        setEditTemplateEnabled(true);
    }

    return (
        <div className='PJ-Details-Body'>
            {/* Templates count and create template button */}
            <div className='PJ-Templates-Header-Container'>
                <div className='PJ-Templates-Header'>
                    <div className='PJ-Header-Side'>{Project.templates.length} Templates</div>
                    <div className='PJ-Header-Side'>
                        <SoftButton variant="outlined" color="primary" size="small" onClick={() => { setCreateTemplateEnabled(true) }}>
                            Create Template
                        </SoftButton>
                    </div>
                </div>
            </div>
            {/* Template Divs with qr code samle render and template controls (Create qr codes, edit template, update all codes, delete all codes) */}
            <Templates Templates={Project.templates} Project={Project} setIsLoaded={setIsLoaded}
                handleEditTemplate={handleEditTemplate}
            />
            <TokensTable Project={Project} />

            <CreateTemplate setEnabled={setCreateTemplateEnabled} Enabled={CreateTemplateEnabled} setIsLoaded={setIsLoaded} Project={Project} />
            <EditTemplate setEnabled={setEditTemplateEnabled} Enabled={EditTemplateEnabled} 
            setIsLoaded={setIsLoaded} Project={Project} Template={TemplateToEdit} />
        </div>
    )
}

export default DetailsBody