/**
 * Business Configuration Template
 * Customize this file to adapt the dashboard for any service business
 */

const BUSINESS_CONFIG = {
    // Company Information
    company: {
        name: "Your Business Name",
        tagline: "Professional Service Management",
        phone: "(555) 123-4567",
        email: "info@yourbusiness.com",
        website: "www.yourbusiness.com",
        address: "123 Main St, Your City, State 12345",
        logo: "", // Will be set via logo upload
        colors: {
            primary: "#4299e1",
            secondary: "#667eea",
            accent: "#764ba2",
            success: "#48bb78",
            warning: "#ed8936",
            error: "#f56565"
        }
    },

    // Service Areas
    serviceAreas: [
        "Your City",
        "Nearby City 1", 
        "Nearby City 2",
        "Nearby City 3"
    ],

    // Service Types
    services: [
        {
            id: "service1",
            name: "Standard Service",
            description: "Basic service offering",
            duration: 2, // hours
            price: 200 // base price
        },
        {
            id: "service2", 
            name: "Premium Service",
            description: "Enhanced service offering",
            duration: 3,
            price: 300
        },
        {
            id: "service3",
            name: "Emergency Service", 
            description: "Urgent service calls",
            duration: 1,
            price: 150
        }
    ],

    // Employee/Technician Template
    employees: [
        {
            id: "emp1",
            firstName: "Employee",
            lastName: "One",
            title: "Senior Technician",
            phone: "(555) 123-4567",
            email: "employee1@yourbusiness.com",
            avatar: "E1",
            color: "#4299e1",
            skills: ["Skill 1", "Skill 2", "Skill 3"],
            experience: "5+ years",
            status: "available"
        },
        {
            id: "emp2",
            firstName: "Employee", 
            lastName: "Two",
            title: "Technician",
            phone: "(555) 123-4567",
            email: "employee2@yourbusiness.com", 
            avatar: "E2",
            color: "#ed8936",
            skills: ["Skill 1", "Skill 2"],
            experience: "2+ years",
            status: "available"
        }
    ],

    // Business Settings
    settings: {
        // Working hours
        workingHours: {
            start: "08:00",
            end: "18:00",
            weekends: true
        },
        
        // Appointment settings
        appointments: {
            defaultDuration: 2, // hours
            bufferTime: 30, // minutes between appointments
            advanceBooking: 30 // days in advance
        },

        // Pricing
        pricing: {
            hourlyRate: 100,
            minimumCharge: 200,
            emergencyMultiplier: 1.5,
            weekendMultiplier: 1.2
        },

        // Features to enable/disable
        features: {
            customerManagement: true,
            scheduling: true,
            mobileInterface: true,
            reporting: true,
            invoicing: false, // Future feature
            inventory: false  // Future feature
        }
    },

    // API Configuration (to be filled in by user)
    apis: {
        googleMaps: {
            enabled: false,
            apiKey: "", // User will add their API key
            defaultCenter: { lat: 40.7128, lng: -74.0060 }, // New York default
            defaultZoom: 10
        },
        firebase: {
            enabled: false,
            config: {
                // User will add their Firebase config
                apiKey: "",
                authDomain: "",
                projectId: "",
                storageBucket: "",
                messagingSenderId: "",
                appId: ""
            }
        }
    },

    // Sample customer data structure
    sampleCustomers: [
        {
            id: "sample_001",
            firstName: "John",
            lastName: "Doe", 
            email: "john.doe@email.com",
            mobilePhone: "(555) 123-4567",
            homePhone: "",
            workPhone: "",
            address: "123 Sample St, Your City, State 12345",
            company: "",
            tags: ["VIP Customer"],
            notes: "Preferred customer - always on time",
            dateAdded: new Date().toISOString()
        },
        {
            id: "sample_002",
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@email.com", 
            mobilePhone: "(555) 987-6543",
            homePhone: "",
            workPhone: "",
            address: "456 Example Ave, Your City, State 12345",
            company: "ABC Company",
            tags: ["Commercial"],
            notes: "Business customer - schedule during business hours",
            dateAdded: new Date().toISOString()
        }
    ]
};

// Configuration functions
const BusinessConfig = {
    // Get current configuration
    getConfig: function() {
        const saved = localStorage.getItem('business-config');
        if (saved) {
            return { ...BUSINESS_CONFIG, ...JSON.parse(saved) };
        }
        return BUSINESS_CONFIG;
    },

    // Save configuration
    saveConfig: function(config) {
        localStorage.setItem('business-config', JSON.stringify(config));
    },

    // Update specific section
    updateSection: function(section, data) {
        const config = this.getConfig();
        config[section] = { ...config[section], ...data };
        this.saveConfig(config);
        return config;
    },

    // Initialize with default data
    initialize: function() {
        const existing = localStorage.getItem('business-config');
        if (!existing) {
            this.saveConfig(BUSINESS_CONFIG);
        }
        
        // Initialize customers if none exist
        const customers = localStorage.getItem('business-customers');
        if (!customers) {
            localStorage.setItem('business-customers', JSON.stringify(BUSINESS_CONFIG.sampleCustomers));
        }
        
        // Initialize employees if none exist
        const employees = localStorage.getItem('business-employees');
        if (!employees) {
            localStorage.setItem('business-employees', JSON.stringify(BUSINESS_CONFIG.employees));
        }
    },

    // Get company info for display
    getCompanyInfo: function() {
        return this.getConfig().company;
    },

    // Get employees
    getEmployees: function() {
        const saved = localStorage.getItem('business-employees');
        if (saved) {
            return JSON.parse(saved);
        }
        return this.getConfig().employees;
    },

    // Save employees
    saveEmployees: function(employees) {
        localStorage.setItem('business-employees', JSON.stringify(employees));
    },

    // Add new employee
    addEmployee: function(employee) {
        const employees = this.getEmployees();
        employee.id = 'emp_' + Date.now();
        employees.push(employee);
        this.saveEmployees(employees);
        return employee;
    },

    // Update employee
    updateEmployee: function(employeeId, updates) {
        const employees = this.getEmployees();
        const index = employees.findIndex(emp => emp.id === employeeId);
        if (index !== -1) {
            employees[index] = { ...employees[index], ...updates };
            this.saveEmployees(employees);
            return employees[index];
        }
        return null;
    },

    // Remove employee
    removeEmployee: function(employeeId) {
        const employees = this.getEmployees();
        const filtered = employees.filter(emp => emp.id !== employeeId);
        this.saveEmployees(filtered);
        return filtered;
    },

    // Get services
    getServices: function() {
        return this.getConfig().services;
    },

    // Update services
    updateServices: function(services) {
        return this.updateSection('services', services);
    },

    // Get service areas
    getServiceAreas: function() {
        return this.getConfig().serviceAreas;
    },

    // Update service areas
    updateServiceAreas: function(areas) {
        return this.updateSection('serviceAreas', areas);
    },

    // Setup wizard - check if business is configured
    isConfigured: function() {
        const config = this.getConfig();
        return config.company.name !== "Your Business Name" && 
               config.company.phone !== "(555) 123-4567";
    },

    // Get setup progress
    getSetupProgress: function() {
        const config = this.getConfig();
        let completed = 0;
        let total = 5;

        if (config.company.name !== "Your Business Name") completed++;
        if (config.company.phone !== "(555) 123-4567") completed++;
        if (config.employees.length > 0 && config.employees[0].firstName !== "Employee") completed++;
        if (config.services.length > 0 && config.services[0].name !== "Standard Service") completed++;
        if (config.serviceAreas.length > 0 && config.serviceAreas[0] !== "Your City") completed++;

        return {
            completed,
            total,
            percentage: Math.round((completed / total) * 100)
        };
    }
};

// Auto-initialize when loaded
if (typeof window !== 'undefined') {
    window.BusinessConfig = BusinessConfig;
    BusinessConfig.initialize();
}

// Export for Node.js if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BUSINESS_CONFIG, BusinessConfig };
}

