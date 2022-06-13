//Get, Put, Post Technician Data
export const getHomepage = () => {
    return fetch('/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
};

export const createHomepage = () => {
    return fetch(`/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
    })
};

export const saveHomepage = () => {
    return fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(),
    });
};


//Get, Put, Post Technician Data
export const getTechnician = () => {
    return fetch('/api/technician', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
};

export const createTechnician = (technicianData) => {
    return fetch(`/api/technician/${technicianData}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(technicianData),
    })
};

export const saveTechnician = (technicianData) => {
    return fetch('/api/technician', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(technicianData),
    });
};

//Get, Put, Post Manager Data
export const getManager = () => {
    return fetch('/api/manager', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
};

export const createManager = (managerData) => {
    return fetch(`/api/manager/${managerData}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(managerData),
    })
};

export const saveManager = (managerData) => {
    return fetch('/api/manager', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(managerData),
    });
};

//Get, Put, Post Airliner Data
export const getAirliner = () => {
    return fetch('/api/airliner', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
};

export const createAirliner = (airlinerData) => {
    return fetch(`/api/airliner/${airlinerData}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(airlinerData),
    })
};

export const saveAirliner = (airlinerData) => {
    return fetch('/api/airliner', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(airlinerData),
    });
};

//Get, Put, Post Inspector Data
export const getInspector = () => {
    return fetch('/api/inspector', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
};

export const createInspector = (inspectorData) => {
    return fetch(`/api/inspector/${inspectorData}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(inspectorData),
    })
};

export const saveInspector = (inspectorData) => {
    return fetch('/api/inspector', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inspectorData),
    });
};

//Get, Put, Post Project Data
export const getProject = () => {
    return fetch('/api/project', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
};

export const createProject = (projectData) => {
    return fetch(`/api/project/${projectData}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
    })
};

export const saveProject = (projectData) => {
    return fetch('/api/project', {
        method: 'POST',
        headers: {
            'Content-Type': 'project/json'
        },
        body: JSON.stringify(projectData),
    });
};
