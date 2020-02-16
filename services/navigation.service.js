import Router from 'next/router';

class NavigationService {
  navigateToLoginPage() {
    Router.push('/auth');
  }

  navigateToSequencePage() {
    Router.push('/sequence');
  }
}

export default new NavigationService();