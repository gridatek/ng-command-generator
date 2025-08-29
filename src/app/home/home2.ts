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
  selector: 'app-home2',
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div class="container mx-auto px-4 py-8 max-w-6xl">
        <!-- Header -->
        <div class="text-center mb-10">
          <div class="flex items-center justify-center mb-6">
            <div class="bg-red-100 p-3 rounded-full mr-4">
              <i class="fab fa-angular text-red-600 text-3xl"></i>
            </div>
            <h1 class="text-4xl font-bold text-gray-800">Angular Command Generator</h1>
          </div>
          <p class="text-gray-600 text-lg max-w-2xl mx-auto">
            Generate optimized <code class="bg-white px-2 py-1 rounded shadow-sm border">ng new</code> commands with a visual interface
          </p>
        </div>

        <!-- Configuration Panel -->
        <div class="bg-white rounded-xl shadow-lg border border-gray-200">
          <!-- Panel Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <div class="flex items-center">
              <div class="bg-blue-100 p-2 rounded-lg mr-3">
                <i class="fas fa-cogs text-blue-600 text-lg"></i>
              </div>
              <h2 class="text-2xl font-semibold text-gray-800">Configuration</h2>
            </div>
            <div class="flex gap-3">
              <button
                (click)="clearStorage()"
                class="flex items-center px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-sm font-medium"
              >
                <i class="fas fa-trash mr-2"></i>
                Clear All
              </button>
              <button
                (click)="resetToDefaults()"
                class="flex items-center px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-sm font-medium"
              >
                <i class="fas fa-undo mr-2"></i>
                Reset
              </button>
            </div>
          </div>

          <form [formGroup]="commandForm" class="p-6">
            <div class="space-y-8">

              <!-- Project Basics Section -->
              <section class="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h3 class="text-xl font-semibold text-blue-800 mb-6 flex items-center">
                  <div class="bg-blue-200 p-2 rounded-lg mr-3">
                    <i class="fas fa-project-diagram text-blue-700"></i>
                  </div>
                  Project Basics
                </h3>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <!-- App Name -->
                  <div>
                    <label for="appName" class="block text-sm font-semibold text-gray-700 mb-3">
                      <i class="fas fa-tag mr-2 text-blue-600"></i>
                      Application Name *
                    </label>
                    <input
                      type="text"
                      id="appName"
                      formControlName="appName"
                      class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200"
                      placeholder="my-angular-app"
                      required
                    />
                    <p class="mt-2 text-xs text-gray-600">The name of your Angular application</p>
                  </div>

                  <!-- Component Prefix -->
                  <div>
                    <label for="prefix" class="block text-sm font-semibold text-gray-700 mb-3">
                      <i class="fas fa-code mr-2 text-blue-600"></i>
                      Component Prefix
                    </label>
                    <input
                      type="text"
                      id="prefix"
                      formControlName="prefix"
                      class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200"
                      placeholder="app"
                    />
                    <p class="mt-2 text-xs text-gray-600">Prefix for component selectors (e.g., app-header)</p>
                  </div>

                  <!-- Directory -->
                  <div>
                    <label for="directory" class="block text-sm font-semibold text-gray-700 mb-3">
                      <i class="fas fa-folder mr-2 text-blue-600"></i>
                      Custom Directory
                    </label>
                    <input
                      type="text"
                      id="directory"
                      formControlName="directory"
                      class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200"
                      placeholder="Leave empty for current directory"
                    />
                    <p class="mt-2 text-xs text-gray-600">Custom directory path for the project</p>
                  </div>

                  <!-- New Project Root -->
                  <div>
                    <label for="newProjectRoot" class="block text-sm font-semibold text-gray-700 mb-3">
                      <i class="fas fa-sitemap mr-2 text-blue-600"></i>
                      Project Root Directory
                    </label>
                    <input
                      type="text"
                      id="newProjectRoot"
                      formControlName="newProjectRoot"
                      class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200"
                      placeholder="projects"
                    />
                    <p class="mt-2 text-xs text-gray-600">Root directory for workspace projects</p>
                  </div>
                </div>
              </section>

              <!-- Styling Section -->
              <section class="bg-purple-50 rounded-xl p-6 border border-purple-100">
                <h3 class="text-xl font-semibold text-purple-800 mb-6 flex items-center">
                  <div class="bg-purple-200 p-2 rounded-lg mr-3">
                    <i class="fas fa-palette text-purple-700"></i>
                  </div>
                  Styling & Architecture
                </h3>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <!-- Style Format -->
                  <div>
                    <label for="style" class="block text-sm font-semibold text-gray-700 mb-3">
                      <i class="fas fa-paint-brush mr-2 text-purple-600"></i>
                      Style Format
                    </label>
                    <select
                      id="style"
                      formControlName="style"
                      class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white shadow-sm transition-all duration-200"
                    >
                      <option value="css">CSS</option>
                      <option value="scss">SCSS (Recommended)</option>
                      <option value="sass">Sass</option>
                      <option value="less">Less</option>
                    </select>
                    <p class="mt-2 text-xs text-gray-600">Stylesheet format for components</p>
                  </div>

                  <!-- View Encapsulation -->
                  <div>
                    <label for="viewEncapsulation" class="block text-sm font-semibold text-gray-700 mb-3">
                      <i class="fas fa-eye mr-2 text-purple-600"></i>
                      View Encapsulation
                    </label>
                    <select
                      id="viewEncapsulation"
                      formControlName="viewEncapsulation"
                      class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white shadow-sm transition-all duration-200"
                    >
                      <option value="">Emulated (Default)</option>
                      <option value="Emulated">Emulated</option>
                      <option value="None">None</option>
                      <option value="ShadowDom">Shadow DOM</option>
                    </select>
                    <p class="mt-2 text-xs text-gray-600">CSS encapsulation strategy for components</p>
                  </div>
                </div>

                <!-- Single File Component Options -->
                <div class="bg-white rounded-lg p-4 border border-purple-200">
                  <h4 class="text-lg font-medium text-gray-700 mb-4 flex items-center">
                    <i class="fas fa-file-code mr-2 text-purple-600"></i>
                    Component File Structure
                  </h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label class="flex items-center p-3 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors duration-200">
                      <input
                        type="checkbox"
                        id="inlineTemplate"
                        formControlName="inlineTemplate"
                        class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <div class="ml-3">
                        <div class="text-sm font-medium text-gray-700">
                          <i class="fas fa-file-code mr-1"></i>
                          Inline Templates
                        </div>
                        <div class="text-xs text-gray-500">Include templates in component files</div>
                      </div>
                    </label>

                    <label class="flex items-center p-3 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors duration-200">
                      <input
                        type="checkbox"
                        id="inlineStyle"
                        formControlName="inlineStyle"
                        class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <div class="ml-3">
                        <div class="text-sm font-medium text-gray-700">
                          <i class="fas fa-code mr-1"></i>
                          Inline Styles
                        </div>
                        <div class="text-xs text-gray-500">Include styles in component files</div>
                      </div>
                    </label>
                  </div>
                </div>
              </section>

              <!-- CLI Interaction Section -->
              <section class="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                <h3 class="text-xl font-semibold text-indigo-800 mb-6 flex items-center">
                  <div class="bg-indigo-200 p-2 rounded-lg mr-3">
                    <i class="fas fa-terminal text-indigo-700"></i>
                  </div>
                  CLI Interaction
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label class="flex items-center p-4 bg-white rounded-lg cursor-pointer hover:bg-indigo-50 transition-colors duration-200 border border-indigo-200">
                    <input
                      type="checkbox"
                      id="interactive"
                      formControlName="interactive"
                      class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-700">
                        <i class="fas fa-comments mr-2"></i>
                        Interactive Mode
                      </div>
                      <div class="text-xs text-gray-500">Enable interactive prompts during setup</div>
                    </div>
                  </label>

                  <label class="flex items-center p-4 bg-white rounded-lg cursor-pointer hover:bg-indigo-50 transition-colors duration-200 border border-indigo-200">
                    <input
                      type="checkbox"
                      id="defaults"
                      formControlName="defaults"
                      class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-700">
                        <i class="fas fa-magic mr-2"></i>
                        Use All Defaults
                      </div>
                      <div class="text-xs text-gray-500">Skip all prompts and use default values</div>
                    </div>
                  </label>
                </div>
              </section>

              <!-- Core Features Section -->
              <section class="bg-green-50 rounded-xl p-6 border border-green-100">
                <h3 class="text-xl font-semibold text-green-800 mb-6 flex items-center">
                  <div class="bg-green-200 p-2 rounded-lg mr-3">
                    <i class="fas fa-cog text-green-700"></i>
                  </div>
                  Core Features
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label class="flex items-center p-4 bg-white rounded-lg cursor-pointer hover:bg-green-50 transition-colors duration-200 border border-green-200">
                    <input
                      type="checkbox"
                      id="routing"
                      formControlName="routing"
                      class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-700">
                        <i class="fas fa-route mr-2"></i>
                        Routing
                      </div>
                      <div class="text-xs text-gray-500">Enable Angular Router</div>
                    </div>
                  </label>

                  <label class="flex items-center p-4 bg-white rounded-lg cursor-pointer hover:bg-green-50 transition-colors duration-200 border border-green-200">
                    <input
                      type="checkbox"
                      id="standalone"
                      formControlName="standalone"
                      class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-700">
                        <i class="fas fa-cube mr-2"></i>
                        Standalone Components
                      </div>
                      <div class="text-xs text-gray-500">Use modern standalone architecture</div>
                    </div>
                  </label>

                  <label class="flex items-center p-4 bg-white rounded-lg cursor-pointer hover:bg-green-50 transition-colors duration-200 border border-green-200">
                    <input
                      type="checkbox"
                      id="strict"
                      formControlName="strict"
                      class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-700">
                        <i class="fas fa-shield-alt mr-2"></i>
                        Strict Mode
                      </div>
                      <div class="text-xs text-gray-500">Enable stricter TypeScript checking</div>
                    </div>
                  </label>
                </div>
              </section>

              <!-- Advanced Features Section -->
              <section class="bg-orange-50 rounded-xl p-6 border border-orange-100">
                <h3 class="text-xl font-semibold text-orange-800 mb-6 flex items-center">
                  <div class="bg-orange-200 p-2 rounded-lg mr-3">
                    <i class="fas fa-rocket text-orange-700"></i>
                  </div>
                  Advanced Features
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label class="flex items-center p-4 bg-white rounded-lg cursor-pointer hover:bg-orange-50 transition-colors duration-200 border border-orange-200">
                    <input
                      type="checkbox"
                      id="ssr"
                      formControlName="ssr"
                      class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-700">
                        <i class="fas fa-server mr-2"></i>
                        Server-Side Rendering (SSR)
                      </div>
                      <div class="text-xs text-gray-500">Enable Angular Universal for SSR</div>
                    </div>
                  </label>

                  <label class="flex items-center p-4 bg-white rounded-lg cursor-pointer hover:bg-orange-50 transition-colors duration-200 border border-orange-200">
                    <input
                      type="checkbox"
                      id="zoneless"
                      formControlName="zoneless"
                      class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-700">
                        <i class="fas fa-circle-notch mr-2"></i>
                        Zoneless Change Detection
                      </div>
                      <div class="text-xs text-gray-500">Use modern change detection without Zone.js</div>
                    </div>
                  </label>
                </div>
              </section>

              <!-- Development Tools Section -->
              <section class="bg-cyan-50 rounded-xl p-6 border border-cyan-100">
                <h3 class="text-xl font-semibold text-cyan-800 mb-6 flex items-center">
                  <div class="bg-cyan-200 p-2 rounded-lg mr-3">
                    <i class="fas fa-tools text-cyan-700"></i>
                  </div>
                  Development Tools
                </h3>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <!-- Package Manager -->
                  <div>
                    <label for="packageManager" class="block text-sm font-semibold text-gray-700 mb-3">
                      <i class="fas fa-box mr-2 text-cyan-600"></i>
                      Package Manager
                    </label>
                    <select
                      id="packageManager"
                      formControlName="packageManager"
                      class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white shadow-sm transition-all duration-200"
                    >
                      <option value="">npm (Default)</option>
                      <option value="npm">npm</option>
                      <option value="yarn">Yarn</option>
                      <option value="pnpm">pnpm (Fast)</option>
                      <option value="bun">Bun (Fastest)</option>
                    </select>
                    <p class="mt-2 text-xs text-gray-600">Package manager for dependencies</p>
                  </div>

                  <!-- AI Tools Configuration -->
                  <div>
                    <label for="aiConfig" class="block text-sm font-semibold text-gray-700 mb-3">
                      <i class="fas fa-robot mr-2 text-cyan-600"></i>
                      AI Assistant Integration
                    </label>
                    <select
                      id="aiConfig"
                      formControlName="aiConfig"
                      class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white shadow-sm transition-all duration-200"
                    >
                      <option value="none">None</option>
                      <option value="claude">Claude</option>
                      <option value="copilot">GitHub Copilot</option>
                      <option value="cursor">Cursor</option>
                      <option value="gemini">Gemini</option>
                      <option value="jetbrains">JetBrains AI</option>
                      <option value="windsurf">Windsurf</option>
                    </select>
                    <p class="mt-2 text-xs text-gray-600">AI assistant for development help</p>
                  </div>
                </div>

                <!-- Schematics Collection -->
                <div>
                  <label for="collection" class="block text-sm font-semibold text-gray-700 mb-3">
                    <i class="fas fa-layer-group mr-2 text-cyan-600"></i>
                    Custom Schematics Collection
                  </label>
                  <input
                    type="text"
                    id="collection"
                    formControlName="collection"
                    class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white shadow-sm transition-all duration-200"
                    placeholder="@angular/material, @ngrx/schematics, etc."
                  />
                  <p class="mt-2 text-xs text-gray-600">Use custom schematics (e.g., Angular Material, NgRx)</p>
                </div>

                <!-- Skip Install -->
                <div class="mt-6">
                  <label class="flex items-center p-4 bg-white rounded-lg cursor-pointer hover:bg-cyan-50 transition-colors duration-200 border border-cyan-200">
                    <input
                      type="checkbox"
                      id="skipInstall"
                      formControlName="skipInstall"
                      class="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                    />
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-700">
                        <i class="fas fa-download mr-2"></i>
                        Skip Package Installation
                      </div>
                      <div class="text-xs text-gray-500">Don't install npm packages automatically</div>
                    </div>
                  </label>
                </div>
              </section>

              <!-- Project Options Section -->
              <section class="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 class="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <div class="bg-gray-200 p-2 rounded-lg mr-3">
                    <i class="fas fa-sliders-h text-gray-700"></i>
                  </div>
                  Project Options
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Testing Options -->
                  <div class="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 class="text-lg font-medium text-gray-700 mb-4 flex items-center">
                      <i class="fas fa-vial mr-2 text-gray-600"></i>
                      Testing
                    </h4>
                    <label class="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                      <input
                        type="checkbox"
                        id="skipTests"
                        formControlName="skipTests"
                        class="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                      />
                      <div class="ml-3">
                        <div class="text-sm font-medium text-gray-700">Skip Test Files</div>
                        <div class="text-xs text-gray-500">Don't generate .spec.ts files</div>
                      </div>
                    </label>
                  </div>

                  <!-- Generation Options -->
                  <div class="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 class="text-lg font-medium text-gray-700 mb-4 flex items-center">
                      <i class="fas fa-cogs mr-2 text-gray-600"></i>
                      Generation
                    </h4>
                    <div class="space-y-3">
                      <label class="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                        <input
                          type="checkbox"
                          id="createApplication"
                          formControlName="createApplication"
                          class="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                        />
                        <div class="ml-3">
                          <div class="text-sm font-medium text-gray-700">Create Initial App</div>
                          <div class="text-xs text-gray-500">Generate the initial application</div>
                        </div>
                      </label>

                      <label class="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                        <input
                          type="checkbox"
                          id="minimal"
                          formControlName="minimal"
                          class="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                        />
                        <div class="ml-3">
                          <div class="text-sm font-medium text-gray-700">Minimal Workspace</div>
                          <div class="text-xs text-gray-500">Create a minimal project structure</div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Git Setup Section -->
              <section class="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                <h3 class="text-xl font-semibold text-emerald-800 mb-6 flex items-center">
                  <div class="bg-emerald-200 p-2 rounded-lg mr-3">
                    <i class="fas fa-git-alt text-emerald-700"></i>
                  </div>
                  Git Setup
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label class="flex items-center p-4 bg-white rounded-lg cursor-pointer hover:bg-emerald-50 transition-colors duration-200 border border-emerald-200">
                    <input
                      type="checkbox"
                      id="commit"
                      formControlName="commit"
                      class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-700">
                        <i class="fas fa-code-branch mr-2"></i>
                        Create Initial Commit
                      </div>
                      <div class="text-xs text-gray-500">Make first commit after project creation</div>
                    </div>
                  </label>

                  <label class="flex items-center p-4 bg-white rounded-lg cursor-pointer hover:bg-emerald-50 transition-colors duration-200 border border-emerald-200">
                    <input
                      type="checkbox"
                      id="skipGit"
                      formControlName="skipGit"
                      class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-700">
                        <i class="fas fa-times mr-2"></i>
                        Skip Git Initialization
                      </div>
                      <div class="text-xs text-gray-500">Don't initialize a Git repository</div>
                    </div>
                  </label>
                </div>
              </section>

              <!-- Execution Options Section -->
              <section class="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
                <h3 class="text-xl font-semibold text-yellow-800 mb-6 flex items-center">
                  <div class="bg-yellow-200 p-2 rounded-lg mr-3">
                    <i class="fas fa-play-circle text-yellow-700"></i>
                  </div>
                  Execution Options
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label class="flex items-center p-4 bg-white rounded-lg cursor-pointer hover:bg-yellow-50 transition-colors duration-200 border border-yellow-200">
                    <input
                      type="checkbox"
                      id="dryRun"
                      formControlName="dryRun"
                      class="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    />
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-700">
                        <i class="fas fa-eye mr-2"></i>
                        Dry Run
                      </div>
                      <div class="text-xs text-gray-500">Preview changes without creating files</div>
                    </div>
                  </label>

                  <label class="flex items-center p-4 bg-white rounded-lg cursor-pointer hover:bg-yellow-50 transition-colors duration-200 border border-yellow-200">
                    <input
                      type="checkbox"
                      id="force"
                      formControlName="force"
                      class="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    />
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-700">
                        <i class="fas fa-exclamation-triangle mr-2"></i>
                        Force Overwrite
                      </div>
                      <div class="text-xs text-gray-500">Overwrite existing files if they exist</div>
                    </div>
                  </label>
                </div>
              </section>
            </div>
          </form>

          <!-- Generated Command Section -->
          <div class="border-t border-gray-200 p-6 bg-gray-50">
            <div class="flex items-center mb-6">
              <div class="bg-green-100 p-2 rounded-lg mr-3">
                <i class="fas fa-terminal text-green-600 text-lg"></i>
              </div>
              <h2 class="text-2xl font-semibold text-gray-800">Generated Command</h2>
            </div>

            <div class="slide-enter">
              <div class="flex items-center justify-between mb-4">
                <p class="text-sm text-gray-600 flex items-center">
                  <i class="fas fa-info-circle mr-2 text-blue-500"></i>
                  Copy this command and run it in your terminal
                </p>
                <button
                  (click)="copyCommand()"
                  class="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <i class="fas fa-copy mr-2"></i>
                  <span class="font-medium">{{ isCopied() ? 'Copied!' : 'Copy Command' }}</span>
                </button>
              </div>

              <div class="bg-gray-900 text-green-400 p-6 rounded-xl border-2 border-gray-700 shadow-inner font-mono text-sm">
                <div class="flex items-start">
                  <span class="text-gray-500 mr-3 select-none">$</span>
                  <span id="command" class="command-output flex-1 break-all leading-relaxed">
                    {{ command() }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .slide-enter {
      animation: slideIn 0.4s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .command-output {
      line-height: 1.6;
      word-break: break-word;
    }

    /* Custom scrollbar for better aesthetics */
    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }

    /* Improve focus states */
    input:focus, select:focus {
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    /* Smooth transitions for all interactive elements */
    input, select, button, label {
      transition: all 0.2s ease-in-out;
    }

    /* Hover effects for sections */
    section {
      transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    }

    section:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home2 implements OnInit, OnDestroy {
  private static readonly STORAGE_KEY = 'angular-command-generator-form';
  protected readonly commandForm: FormGroup;
  protected readonly isCopied = signal<boolean>(false);
  private formSubscription?: Subscription;

  formValueSignal;

  private readonly defaultValues = {
    appName: 'my-angular-app',
    directory: '',
    style: 'scss',
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
    this.formSubscription = this.commandForm.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.saveToStorage(value);
      });
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(Home2.STORAGE_KEY);
      if (stored) {
        const formData = JSON.parse(stored);
        const mergedData = { ...this.defaultValues, ...formData };
        this.commandForm.patchValue(mergedData, { emitEvent: false });
      }
    } catch (error) {
      console.warn('Failed to load form data from localStorage:', error);
    }
  }

  private saveToStorage(value: any) {
    try {
      localStorage.setItem(Home2.STORAGE_KEY, JSON.stringify(value));
    } catch (error) {
      console.warn('Failed to save form data to localStorage:', error);
    }
  }

  protected clearStorage() {
    try {
      localStorage.removeItem(Home2.STORAGE_KEY);
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
