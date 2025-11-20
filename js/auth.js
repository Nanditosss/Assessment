// Sistema de autenticación y control de acceso

// Contraseña de administrador (en producción debería estar en el backend)
const ADMIN_PASSWORD = 'Unikal2025Admin!';
const ADMIN_EMAIL = 'admin@unikal.tech';

// Función para verificar si es administrador
function isAdmin() {
    const adminAuth = sessionStorage.getItem('admin_authenticated');
    return adminAuth === 'true';
}

// Función para obtener el email del cliente actual
function getCurrentUserEmail() {
    return sessionStorage.getItem('user_email');
}

// Función para establecer el email del cliente
function setCurrentUserEmail(email) {
    sessionStorage.setItem('user_email', email);
}

// Función para login de administrador
function adminLogin(password) {
    if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem('admin_authenticated', 'true');
        sessionStorage.setItem('user_email', ADMIN_EMAIL);
        return true;
    }
    return false;
}

// Función para logout
function logout() {
    sessionStorage.removeItem('admin_authenticated');
    sessionStorage.removeItem('user_email');
    window.location.href = 'acceso-respuestas.html';
}

// Función para verificar acceso a respuestas
function checkAccessToResponses() {
    const userEmail = getCurrentUserEmail();
    const isAdminUser = isAdmin();
    
    if (!userEmail && !isAdminUser) {
        // Redirigir a página de acceso si no hay sesión
        window.location.href = 'acceso-respuestas.html';
        return false;
    }
    
    return true;
}

// Función para filtrar respuestas según el usuario
function filterResponsesByUser(responses) {
    if (isAdmin()) {
        // Admin ve todas las respuestas
        return responses;
    } else {
        // Cliente solo ve sus propias respuestas
        const userEmail = getCurrentUserEmail();
        return responses.filter(r => r.email === userEmail);
    }
}

// Función para mostrar información del usuario en la interfaz
function displayUserInfo() {
    const userEmail = getCurrentUserEmail();
    const isAdminUser = isAdmin();
    
    const userInfoDiv = document.getElementById('userInfo');
    if (userInfoDiv) {
        if (isAdminUser) {
            userInfoDiv.innerHTML = `
                <div style="background: rgba(0, 168, 156, 0.1); padding: 12px 20px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <i class="fas fa-user-shield" style="color: var(--turquesa); margin-right: 10px;"></i>
                        <strong style="color: var(--verde-oscuro);">Modo Administrador</strong>
                        <span style="color: var(--turquesa); margin-left: 10px;">Ver todas las respuestas</span>
                    </div>
                    <button onclick="logout()" class="btn btn-outline" style="padding: 8px 16px; font-size: 0.9rem;">
                        <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
                    </button>
                </div>
            `;
        } else {
            userInfoDiv.innerHTML = `
                <div style="background: rgba(124, 182, 178, 0.1); padding: 12px 20px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <i class="fas fa-user" style="color: var(--turquesa); margin-right: 10px;"></i>
                        <strong style="color: var(--verde-oscuro);">Sesión iniciada como:</strong>
                        <span style="color: var(--turquesa); margin-left: 10px;">${userEmail}</span>
                    </div>
                    <button onclick="logout()" class="btn btn-outline" style="padding: 8px 16px; font-size: 0.9rem;">
                        <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
                    </button>
                </div>
            `;
        }
    }
}