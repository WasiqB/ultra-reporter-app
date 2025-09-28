# EnhancedAppSidebar Component

A comprehensive sidebar component with authentication awareness, dynamic menu items, and user profile management.

## Features

- **Authentication Awareness**: Displays different UI based on user authentication state
- **Dynamic Menu Items**: Shows Reports, Upload, and View History for all users
- **User Profile Section**: Displays user avatar, name, and email with appropriate masking
- **Collapsible Design**: Built on top of the existing Sidebar component with collapsible functionality
- **Responsive**: Works on both desktop and mobile devices

## Usage

```tsx
import { EnhancedAppSidebar } from '@ultra-reporter/ui/components/enhanced-app-sidebar';
import { SidebarProvider } from '@ultra-reporter/ui/components/sidebar';

function App() {
  const user = {
    id: 'user-123',
    name: 'John Doe',
    email: 'john.doe@example.com',
    image: 'https://example.com/avatar.jpg',
    isAnonymous: false,
  };

  const handleAuthAction = (action: 'signin' | 'signout' | 'signup') => {
    // Handle authentication actions
    console.log(`Auth action: ${action}`);
  };

  return (
    <SidebarProvider>
      <EnhancedAppSidebar
        user={user}
        onAuthAction={handleAuthAction}
        currentPath="/dashboard/reports"
      />
    </SidebarProvider>
  );
}
```

## Props

### EnhancedSidebarProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `user` | `EnhancedSidebarUser \| null` | No | Current user object or null for unauthenticated state |
| `onAuthAction` | `(action: 'signin' \| 'signout' \| 'signup') => void` | No | Callback for authentication actions |
| `currentPath` | `string` | No | Current page path to highlight active menu item |

### EnhancedSidebarUser

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | Yes | Unique user identifier |
| `name` | `string` | Yes | User's display name |
| `email` | `string` | Yes | User's email address |
| `image` | `string` | No | URL to user's avatar image |
| `isAnonymous` | `boolean` | No | Whether the user is anonymous/guest |

## User States

### Anonymous/Guest User
- Shows "Guest" as username
- Shows "Anonymous User" or "Not signed in" as subtitle
- Displays generic user icon as avatar
- Shows "Sign in" option in dropdown
- Shows "Sign In" and "Sign Up" buttons at bottom

### Authenticated User
- Shows actual username and masked email
- Shows user's avatar or initials
- Shows full user menu with: Upgrade, Preferences, Billing, Notification, Sign out
- No authentication buttons at bottom

## Menu Items

The sidebar includes these menu items for all users:
- **Reports**: Navigate to reports dashboard
- **Upload**: Navigate to file upload page  
- **View History**: Navigate to upload history

## Integration with Better-Auth

```tsx
import { authClient } from '@ultra-reporter/auth/lib/auth-client';

function MyApp() {
  const { data: session } = authClient.useSession();
  
  const user = session?.user ? {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
    isAnonymous: session.user.isAnonymous,
  } : null;

  const handleAuthAction = async (action: 'signin' | 'signout' | 'signup') => {
    switch (action) {
      case 'signin':
        // Redirect to sign in page or open modal
        window.location.href = '/auth/signin';
        break;
      case 'signout':
        await authClient.signOut();
        break;
      case 'signup':
        // Redirect to sign up page or open modal
        window.location.href = '/auth/signup';
        break;
    }
  };

  return (
    <SidebarProvider>
      <EnhancedAppSidebar
        user={user}
        onAuthAction={handleAuthAction}
        currentPath={pathname}
      />
    </SidebarProvider>
  );
}
```

## Styling

The component uses Tailwind CSS classes and follows the existing design system. It's built on top of the Shadcn UI Sidebar component and inherits all its styling capabilities.

## Accessibility

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Focus management
- High contrast support