import { StyleSheet, ColorValue } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  drawerContent: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingTop: 20,
  },
  drawerItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  drawerItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  drawerItemText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  subMenu: {
    backgroundColor: '#222',
    paddingLeft: 20,
  },
  subMenuItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  subMenuItemText: {
    color: '#4A90E2',
    fontSize: 14,
  },
});

export const navigatorOptions = {
  headerBackground: {
    colors: ['#1a1a1a', '#2d2d2d'] as readonly [ColorValue, ColorValue],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  headerStyle: {
    height: 80,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitleStyle: {
    opacity: 0,
  },
  drawerStyle: {
    backgroundColor: '#1a1a1a',
    width: 240,
  },
  drawerActiveTintColor: '#4A90E2',
  drawerInactiveTintColor: '#666',
  swipeEnabled: true,
  swipeEdgeWidth: 100,
  headerLeftContainerStyle: {
    paddingLeft: 15,
    zIndex: 2,
  },
}; 