import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
  ViewEncapsulation,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="bg-gray-100 min-h-screen">
      <div class="container mx-auto px-4 py-8 max-w-7xl">
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="flex items-center justify-center mb-4">
            <i class="fab fa-angular text-red-600 text-4xl mr-3"></i>
            <h1 class="text-4xl font-bold text-gray-800">Angular Command Generator</h1>
          </div>
          <p class="text-gray-600 text-lg">
            Generate optimized <code class="bg-gray-200 px-2 py-1 rounded">ng new</code> commands
          </p>
        </div>

        <!-- Configuration Panel -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center">
              <i class="fas fa-cogs text-blue-600 text-xl mr-2"></i>
              <h2 class="text-2xl font-semibold text-gray-800">Configuration</h2>
            </div>
            <div class="flex gap-2">
              <button
                (click)="clearStorage()"
                class="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              >
                <i class="fas fa-trash mr-1"></i>
                Clear
              </button>
              <button
                (click)="resetToDefaults()"
                class="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"
              >
                <i class="fas fa-undo mr-1"></i>
                Reset
              </button>
            </div>
          </div>

          <form [formGroup]="commandForm" class="mb-6">
            <div class="space-y-6">
              <!-- Row 1: App Name and Directory -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- App Name -->
                <div>
                  <label for="appName" class="block text-sm font-medium text-gray-700 mb-2">
                    <i class="fas fa-tag mr-1"></i>
                    Application Name *
                  </label>
                  <input
                    type="text"
                    id="appName"
                    formControlName="appName"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="my-angular-app"
                    required
                  />
                  <p class="mt-1 text-xs text-gray-500">The name of your Angular application</p>
                </div>

                <!-- Directory -->
                <div>
                  <label for="directory" class="block text-sm font-medium text-gray-700 mb-2">
                    <i class="fas fa-folder mr-1"></i>
                    Directory
                  </label>
                  <input
                    type="text"
                    id="directory"
                    formControlName="directory"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Leave empty for current directory"
                  />
                  <p class="mt-1 text-xs text-gray-500">Custom directory path for the project</p>
                </div>
              </div>

              <!-- Row 2: Style Format and View Encapsulation -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Style Format -->
                <div>
                  <label for="style" class="block text-sm font-medium text-gray-700 mb-2">
                    <i class="fas fa-paint-brush mr-1"></i>
                    Style Format
                  </label>
                  <select
                    id="style"
                    formControlName="style"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="css">CSS</option>
                    <option value="scss">SCSS</option>
                    <option value="sass">Sass</option>
                    <option value="less">Less</option>
                  </select>
                  <p class="mt-1 text-xs text-gray-500">Stylesheet format for components</p>
                </div>

                <!-- View Encapsulation -->
                <div>
                  <label for="viewEncapsulation" class="block text-sm font-medium text-gray-700 mb-2">
                    <i class="fas fa-eye mr-1"></i>
                    View Encapsulation
                  </label>
                  <select
                    id="viewEncapsulation"
                    formControlName="viewEncapsulation"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Default (Emulated)</option>
                    <option value="Emulated">Emulated</option>
                    <option value="None">None</option>
                    <option value="ShadowDom">ShadowDom</option>
                  </select>
                  <p class="mt-1 text-xs text-gray-500">CSS encapsulation strategy for components</p>
                </div>
              </div>

              <!-- Row 3: Package Manager and Skip Install -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Package Manager -->
                <div>
                  <label for="packageManager" class="block text-sm font-medium text-gray-700 mb-2">
                    <i class="fas fa-box mr-1"></i>
                    Package Manager
                  </label>
                  <select
                    id="packageManager"
                    formControlName="packageManager"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Default (npm)</option>
                    <option value="npm">npm</option>
                    <option value="yarn">yarn</option>
                    <option value="pnpm">pnpm</option>
                    <option value="bun">bun</option>
                    <option value="cnpm">cnpm</option>
                  </select>
                  <p class="mt-1 text-xs text-gray-500">Package manager to use for dependencies</p>
                </div>

                <!-- Skip Install -->
                <div class="flex items-end">
                  <div>
                    <div class="flex items-center h-10">
                      <input
                        type="checkbox"
                        id="skipInstall"
                        formControlName="skipInstall"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label for="skipInstall" class="ml-2 block text-sm text-gray-700">
                        <i class="fas fa-download mr-1"></i>
                        Skip Install
                      </label>
                    </div>
                    <p class="mt-1 text-xs text-gray-500">Skip package installation</p>
                  </div>
                </div>
              </div>

              <!-- Row 4: AI Tools Configuration and Component Prefix -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- AI Config -->
                <div>
                  <label for="aiConfig" class="block text-sm font-medium text-gray-700 mb-2">
                    <i class="fas fa-robot mr-1"></i>
                    AI Tools Configuration
                  </label>
                  <select
                    id="aiConfig"
                    formControlName="aiConfig"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="none">None</option>
                    <option value="claude">Claude</option>
                    <option value="copilot">GitHub Copilot</option>
                    <option value="cursor">Cursor</option>
                    <option value="gemini">Gemini</option>
                    <option value="jetbrains">JetBrains</option>
                    <option value="windsurf">Windsurf</option>
                  </select>
                  <p class="mt-1 text-xs text-gray-500">AI assistant integration for development</p>
                </div>

                <!-- Component Prefix -->
                <div>
                  <label for="prefix" class="block text-sm font-medium text-gray-700 mb-2">
                    <i class="fas fa-code mr-1"></i>
                    Component Prefix
                  </label>
                  <input
                    type="text"
                    id="prefix"
                    formControlName="prefix"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="app"
                  />
                  <p class="mt-1 text-xs text-gray-500">Prefix for component selectors</p>
                </div>
              </div>

              <!-- Row 5: Collection and New Project Root -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Collection -->
                <div>
                  <label for="collection" class="block text-sm font-medium text-gray-700 mb-2">
                    <i class="fas fa-layer-group mr-1"></i>
                    Schematics Collection
                  </label>
                  <input
                    type="text"
                    id="collection"
                    formControlName="collection"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="@angular/material, @ngrx/schematics, etc."
                  />
                  <p class="mt-1 text-xs text-gray-500">Schematics collection to use for generation</p>
                </div>

                <!-- New Project Root -->
                <div>
                  <label for="newProjectRoot" class="block text-sm font-medium text-gray-700 mb-2">
                    <i class="fas fa-sitemap mr-1"></i>
                    New Project Root
                  </label>
                  <input
                    type="text"
                    id="newProjectRoot"
                    formControlName="newProjectRoot"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="projects"
                  />
                  <p class="mt-1 text-xs text-gray-500">Root directory for new projects</p>
                </div>
              </div>
            </div>

            <!-- Git Configuration -->
            <div class="mt-6 border-t pt-4">
              <h3 class="text-lg font-semibold text-gray-700 mb-3">
                <i class="fas fa-git-alt mr-1"></i>
                Git Configuration
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="commit"
                      formControlName="commit"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label for="commit" class="ml-2 block text-sm text-gray-700">
                      <i class="fas fa-code-branch mr-1"></i>
                      Initial Commit
                    </label>
                  </div>
                  <p class="mt-1 text-xs text-gray-500 ml-6">Create initial Git commit</p>
                </div>

                <div>
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="skipGit"
                      formControlName="skipGit"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label for="skipGit" class="ml-2 block text-sm text-gray-700">
                      <i class="fas fa-git-alt mr-1"></i>
                      Skip Git
                    </label>
                  </div>
                  <p class="mt-1 text-xs text-gray-500 ml-6">Don't initialize Git repository</p>
                </div>
              </div>
            </div>

            <!-- Boolean Options -->
            <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-3">
                <div>
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="routing"
                      formControlName="routing"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label for="routing" class="ml-2 block text-sm text-gray-700">
                      <i class="fas fa-route mr-1"></i>
                      Routing
                    </label>
                  </div>
                  <p class="mt-1 text-xs text-gray-500 ml-6">Enable routing in the application</p>
                </div>

                <div>
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="standalone"
                      formControlName="standalone"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label for="standalone" class="ml-2 block text-sm text-gray-700">
                      <i class="fas fa-cube mr-1"></i>
                      Standalone
                    </label>
                  </div>
                  <p class="mt-1 text-xs text-gray-500 ml-6">Use standalone components (recommended)</p>
                </div>

                <div>
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="strict"
                      formControlName="strict"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label for="strict" class="ml-2 block text-sm text-gray-700">
                      <i class="fas fa-shield-alt mr-1"></i>
                      Strict Mode
                    </label>
                  </div>
                  <p class="mt-1 text-xs text-gray-500 ml-6">Enable stricter type checking</p>
                </div>

                <div>
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="ssr"
                      formControlName="ssr"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label for="ssr" class="ml-2 block text-sm text-gray-700">
                      <i class="fas fa-server mr-1"></i>
                      SSR
                    </label>
                  </div>
                  <p class="mt-1 text-xs text-gray-500 ml-6">Server-Side Rendering</p>
                </div>

                <div>
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="zoneless"
                      formControlName="zoneless"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label for="zoneless" class="ml-2 block text-sm text-gray-700">
                      <i class="fas fa-circle-notch mr-1"></i>
                      Zoneless
                    </label>
                  </div>
                  <p class="mt-1 text-xs text-gray-500 ml-6">Don't use zone.js</p>
                </div>
              </div>

              <div class="space-y-3">
                <div>
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="createApplication"
                      formControlName="createApplication"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label for="createApplication" class="ml-2 block text-sm text-gray-700">
                      <i class="fas fa-plus-circle mr-1"></i>
                      Create App
                    </label>
                  </div>
                  <p class="mt-1 text-xs text-gray-500 ml-6">Create initial application</p>
                </div>

                <div>
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="interactive"
                      formControlName="interactive"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label for="interactive" class="ml-2 block text-sm text-gray-700">
                      <i class="fas fa-comments mr-1"></i>
                      Interactive
                    </label>
                  </div>
                  <p class="mt-1 text-xs text-gray-500 ml-6">Enable interactive prompts</p>
                </div>

                <div>
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="skipTests"
                      formControlName="skipTests"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label for="skipTests" class="ml-2 block text-sm text-gray-700">
                      <i class="fas fa-vial mr-1"></i>
                      Skip Tests
                    </label>
                  </div>
                  <p class="mt-1 text-xs text-gray-500 ml-6">Skip test file generation</p>
                </div>

                <div>
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="minimal"
                      formControlName="minimal"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label for="minimal" class="ml-2 block text-sm text-gray-700">
                      <i class="fas fa-minus-circle mr-1"></i>
                      Minimal
                    </label>
                  </div>
                  <p class="mt-1 text-xs text-gray-500 ml-6">Generate minimal workspace</p>
                </div>
              </div>
            </div>

            <!-- Single File Component Options -->
            <div class="border-t pt-4">
              <h3 class="text-lg font-semibold text-gray-700 mb-3">
                <i class="fas fa-file-code mr-1"></i>
                Single File Component
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="inlineTemplate"
                      formControlName="inlineTemplate"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label for="inlineTemplate" class="ml-2 block text-sm text-gray-700">
                      <i class="fas fa-file-code mr-1"></i>
                      Inline Template
                    </label>
                  </div>
                  <p class="mt-1 text-xs text-gray-500 ml-6">Include templates in component files</p>
                </div>

                <div>
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="inlineStyle"
                      formControlName="inlineStyle"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label for="inlineStyle" class="ml-2 block text-sm text-gray-700">
                      <i class="fas fa-code mr-1"></i>
                      Inline Style
                    </label>
                  </div>
                  <p class="mt-1 text-xs text-gray-500 ml-6">Include styles in component files</p>
                </div>
              </div>
            </div>

            <!-- Advanced Options -->
            <div class="border-t pt-4">
              <h3 class="text-lg font-semibold text-gray-700 mb-3">
                <i class="fas fa-sliders-h mr-1"></i>
                Advanced Options
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="defaults"
                      formControlName="defaults"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label for="defaults" class="ml-2 block text-sm text-gray-700">
                      <i class="fas fa-magic mr-1"></i>
                      Use Defaults
                    </label>
                  </div>
                  <p class="mt-1 text-xs text-gray-500 ml-6">Disable interactive prompts</p>
                </div>

                <div>
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="dryRun"
                      formControlName="dryRun"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label for="dryRun" class="ml-2 block text-sm text-gray-700">
                      <i class="fas fa-play mr-1"></i>
                      Dry Run
                    </label>
                  </div>
                  <p class="mt-1 text-xs text-gray-500 ml-6">Preview without creating files</p>
                </div>

                <div>
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="force"
                      formControlName="force"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label for="force" class="ml-2 block text-sm text-gray-700">
                      <i class="fas fa-exclamation-triangle mr-1"></i>
                      Force
                    </label>
                  </div>
                  <p class="mt-1 text-xs text-gray-500 ml-6">Overwrite existing files</p>
                </div>
              </div>
            </div>
          </form>

          <div class="flex items-center mb-6">
            <i class="fas fa-terminal text-green-600 text-xl mr-2"></i>
            <h2 class="text-2xl font-semibold text-gray-800">Generated Command</h2>
          </div>

          <div class="mb-6 slide-enter">
            <div class="flex items-center justify-end mb-2">
              <button
                (click)="copyCommand()"
                class="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <i class="fas fa-copy mr-1"></i>
                <span class="font-medium">{{ isCopied() ? 'Copied!' : 'Copy' }}</span>
              </button>
            </div>
            <div class="bg-gray-900 text-green-400 p-4 rounded-lg">
              <div class="flex items-start">
                <span class="text-gray-500 mr-2">$</span>
                <span id="command" class="command-output flex-1 break-all">
                  {{ command() }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit, OnDestroy {
  private static readonly STORAGE_KEY = 'angular-command-generator-form';
  protected readonly commandForm: FormGroup;
  protected readonly isCopied = signal<boolean>(false);
  private formSubscription?: Subscription;

  formValueSignal;

  private readonly defaultValues = {
    appName: 'my-angular-app',
    directory: '',
    style: 'css',
    packageManager: '',
    aiConfig: 'none',
    collection: '',
    prefix: 'app',
    viewEncapsulation: '',
    newProjectRoot: 'projects',
    routing: true,
    standalone: true,
    strict: true,
    ssr: false,
    zoneless: false,
    commit: true,
    createApplication: true,
    interactive: true,
    skipGit: false,
    skipInstall: false,
    skipTests: false,
    minimal: false,
    inlineStyle: false,
    inlineTemplate: false,
    defaults: false,
    dryRun: false,
    force: false,
  };

  constructor(private readonly fb: FormBuilder) {
    this.commandForm = this.fb.group(this.defaultValues);
    this.formValueSignal = toSignal(this.commandForm.valueChanges, {
      initialValue: this.commandForm.value,
    });
  }

  ngOnInit() {
    this.loadFromStorage();
    this.setupFormSubscription();
  }

  ngOnDestroy() {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }

  private setupFormSubscription() {
    // Debounce the form changes to avoid too frequent localStorage writes
    this.formSubscription = this.commandForm.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.saveToStorage(value);
      });
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(Home.STORAGE_KEY);
      if (stored) {
        const formData = JSON.parse(stored);
        // Merge with defaults to handle new fields that might have been added
        const mergedData = { ...this.defaultValues, ...formData };
        this.commandForm.patchValue(mergedData, { emitEvent: false });
      }
    } catch (error) {
      console.warn('Failed to load form data from localStorage:', error);
    }
  }

  private saveToStorage(value: any) {
    try {
      localStorage.setItem(Home.STORAGE_KEY, JSON.stringify(value));
    } catch (error) {
      console.warn('Failed to save form data to localStorage:', error);
    }
  }

  protected clearStorage() {
    try {
      localStorage.removeItem(Home.STORAGE_KEY);
      this.resetToDefaults();
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  }

  protected resetToDefaults() {
    this.commandForm.patchValue(this.defaultValues);
  }

  protected readonly command = computed(() => {
    const formValue = this.formValueSignal();

    let cmd = 'ng new';

    // Application Name and Directory
    if (formValue.appName) {
      cmd += ` ${formValue.appName}`;
    }
    if (formValue.directory) {
      cmd += ` --directory="${formValue.directory}"`;
    }

    // Other options
    if (formValue.style && formValue.style !== 'css') {
      cmd += ` --style=${formValue.style}`;
    }
    if (formValue.packageManager && formValue.packageManager !== '') {
      cmd += ` --package-manager=${formValue.packageManager}`;
    }
    if (formValue.aiConfig !== '' && formValue.aiConfig !== 'none') {
      cmd += ` --ai-config=${formValue.aiConfig}`;
    }
    if (formValue.collection) {
      cmd += ` --collection=${formValue.collection}`;
    }
    if (formValue.prefix && formValue.prefix !== 'app') {
      cmd += ` --prefix=${formValue.prefix}`;
    }
    if (formValue.viewEncapsulation) {
      cmd += ` --view-encapsulation=${formValue.viewEncapsulation}`;
    }
    if (formValue.newProjectRoot && formValue.newProjectRoot !== 'projects') {
      cmd += ` --new-project-root=${formValue.newProjectRoot}`;
    }

    // Boolean flags
    if (!formValue.routing) cmd += ' --no-routing';
    if (!formValue.standalone) cmd += ' --no-standalone';
    if (!formValue.strict) cmd += ' --no-strict';
    if (!formValue.commit) cmd += ' --no-commit';
    if (!formValue.createApplication) cmd += ' --no-create-application';
    if (!formValue.interactive) cmd += ' --no-interactive';

    if (formValue.ssr) cmd += ' --ssr';
    if (formValue.zoneless) cmd += ' --zoneless';
    if (formValue.skipGit) cmd += ' --skip-git';
    if (formValue.skipInstall) cmd += ' --skip-install';
    if (formValue.skipTests) cmd += ' --skip-tests';
    if (formValue.minimal) cmd += ' --minimal';
    if (formValue.inlineStyle) cmd += ' --inline-style';
    if (formValue.inlineTemplate) cmd += ' --inline-template';
    if (formValue.defaults) cmd += ' --defaults';
    if (formValue.dryRun) cmd += ' --dry-run';
    if (formValue.force) cmd += ' --force';

    return cmd;
  });

  protected copyCommand() {
    if (this.command() && navigator.clipboard) {
      navigator.clipboard
        .writeText(this.command())
        .then(() => {
          this.isCopied.set(true);
          setTimeout(() => this.isCopied.set(false), 2000);
        })
        .catch((err) => {
          console.error('Failed to copy text: ', err);
        });
    }
  }
}
