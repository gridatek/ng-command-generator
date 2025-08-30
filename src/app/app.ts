import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet />


  <!-- Footer -->
  <footer class="py-12 border-t border-gray-200 pt-8">
    <div class="text-center">
      <div class="flex items-center justify-center mb-2">
        <i class="fab fa-github text-gray-600 text-xl mr-2"></i>
        <a
          href="https://github.com/gridatek/ng-command-generator"
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-600 hover:text-gray-800 transition-colors font-medium"
        >
          View on GitHub
        </a>
      </div>
      <p class="text-sm text-gray-500">
        Built with Angular • Open Source
      </p>
    </div>
  </footer>


  `,
})
export class App {}
