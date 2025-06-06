// GitHub API utility functions
const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_USERNAME = "vincecharles";

export class GitHubAPI {
	constructor(token = null) {
		this.token = token;
		this.headers = {
			'Accept': 'application/vnd.github.v3+json',
			...(token && { 'Authorization': `token ${token}` })
		};
	}

	async fetchWithErrorHandling(url) {
		try {
			const response = await fetch(url, { headers: this.headers });
			
			if (response.status === 403) {
				throw new Error('Rate limit exceeded. Please try again later.');
			}
			
			if (!response.ok) {
				throw new Error(`GitHub API error: ${response.status}`);
			}
			
			return await response.json();
		} catch (error) {
			console.error('GitHub API Error:', error);
			throw error;
		}
	}

	// Get user profile data
	async getUserProfile(username = GITHUB_USERNAME) {
		return this.fetchWithErrorHandling(`${GITHUB_API_BASE}/users/${username}`);
	}

	// Get user repositories with enhanced filtering
	async getUserRepos(username = GITHUB_USERNAME, options = {}) {
		const {
			type = 'all', // all, owner, member
			sort = 'updated', // created, updated, pushed, full_name
			direction = 'desc', // asc, desc
			per_page = 100,
			page = 1
		} = options;

		const params = new URLSearchParams({
			type,
			sort,
			direction,
			per_page: per_page.toString(),
			page: page.toString()
		});

		return this.fetchWithErrorHandling(
			`${GITHUB_API_BASE}/users/${username}/repos?${params}`
		);
	}

	// Get repository languages
	async getRepoLanguages(username, repoName) {
		return this.fetchWithErrorHandling(
			`${GITHUB_API_BASE}/repos/${username}/${repoName}/languages`
		);
	}

	// Get repository commits (last 30)
	async getRepoCommits(username, repoName, options = {}) {
		const {
			per_page = 30,
			page = 1,
			since = null // ISO 8601 date string
		} = options;

		const params = new URLSearchParams({
			per_page: per_page.toString(),
			page: page.toString()
		});

		if (since) {
			params.append('since', since);
		}

		return this.fetchWithErrorHandling(
			`${GITHUB_API_BASE}/repos/${username}/${repoName}/commits?${params}`
		);
	}

	// Get repository contributors
	async getRepoContributors(username, repoName) {
		return this.fetchWithErrorHandling(
			`${GITHUB_API_BASE}/repos/${username}/${repoName}/contributors`
		);
	}

	// Get repository issues
	async getRepoIssues(username, repoName, options = {}) {
		const {
			state = 'open', // open, closed, all
			labels = '',
			sort = 'created', // created, updated, comments
			direction = 'desc',
			per_page = 30
		} = options;

		const params = new URLSearchParams({
			state,
			sort,
			direction,
			per_page: per_page.toString()
		});

		if (labels) {
			params.append('labels', labels);
		}

		return this.fetchWithErrorHandling(
			`${GITHUB_API_BASE}/repos/${username}/${repoName}/issues?${params}`
		);
	}

	// Get repository releases
	async getRepoReleases(username, repoName) {
		return this.fetchWithErrorHandling(
			`${GITHUB_API_BASE}/repos/${username}/${repoName}/releases`
		);
	}

	// Get user's contribution activity
	async getUserActivity(username = GITHUB_USERNAME) {
		return this.fetchWithErrorHandling(
			`${GITHUB_API_BASE}/users/${username}/events/public?per_page=30`
		);
	}

	// Get user's starred repositories
	async getUserStarred(username = GITHUB_USERNAME, options = {}) {
		const {
			sort = 'created', // created, updated
			direction = 'desc',
			per_page = 30
		} = options;

		const params = new URLSearchParams({
			sort,
			direction,
			per_page: per_page.toString()
		});

		return this.fetchWithErrorHandling(
			`${GITHUB_API_BASE}/users/${username}/starred?${params}`
		);
	}

	// Get user's followers
	async getUserFollowers(username = GITHUB_USERNAME) {
		return this.fetchWithErrorHandling(
			`${GITHUB_API_BASE}/users/${username}/followers`
		);
	}

	// Get user's following
	async getUserFollowing(username = GITHUB_USERNAME) {
		return this.fetchWithErrorHandling(
			`${GITHUB_API_BASE}/users/${username}/following`
		);
	}

	// Get user's organizations
	async getUserOrgs(username = GITHUB_USERNAME) {
		return this.fetchWithErrorHandling(
			`${GITHUB_API_BASE}/users/${username}/orgs`
		);
	}

	// Get repository statistics
	async getRepoStats(username, repoName) {
		try {
			const [commits, contributors, codeFrequency, participation] = await Promise.allSettled([
				this.fetchWithErrorHandling(`${GITHUB_API_BASE}/repos/${username}/${repoName}/stats/commit_activity`),
				this.fetchWithErrorHandling(`${GITHUB_API_BASE}/repos/${username}/${repoName}/stats/contributors`),
				this.fetchWithErrorHandling(`${GITHUB_API_BASE}/repos/${username}/${repoName}/stats/code_frequency`),
				this.fetchWithErrorHandling(`${GITHUB_API_BASE}/repos/${username}/${repoName}/stats/participation`)
			]);

			return {
				commits: commits.status === 'fulfilled' ? commits.value : null,
				contributors: contributors.status === 'fulfilled' ? contributors.value : null,
				codeFrequency: codeFrequency.status === 'fulfilled' ? codeFrequency.value : null,
				participation: participation.status === 'fulfilled' ? participation.value : null
			};
		} catch (error) {
			console.error('Error fetching repository stats:', error);
			return null;
		}
	}

	// Get repository contents and README
	async getRepoContents(username, repoName, path = '') {
		try {
			const contentsUrl = path 
				? `${GITHUB_API_BASE}/repos/${username}/${repoName}/contents/${path}`
				: `${GITHUB_API_BASE}/repos/${username}/${repoName}/contents`;
			
			return this.fetchWithErrorHandling(contentsUrl);
		} catch (error) {
			console.error('Error fetching repository contents:', error);
			return null;
		}
	}

	// Get repository README
	async getRepoReadme(username, repoName) {
		try {
			return this.fetchWithErrorHandling(
				`${GITHUB_API_BASE}/repos/${username}/${repoName}/readme`
			);
		} catch (error) {
			console.error('Error fetching repository README:', error);
			return null;
		}
	}

	// Get repository pull requests
	async getRepoPullRequests(username, repoName, options = {}) {
		const {
			state = 'open', // open, closed, all
			sort = 'created', // created, updated, popularity
			direction = 'desc',
			per_page = 30
		} = options;

		const params = new URLSearchParams({
			state,
			sort,
			direction,
			per_page: per_page.toString()
		});

		return this.fetchWithErrorHandling(
			`${GITHUB_API_BASE}/repos/${username}/${repoName}/pulls?${params}`
		);
	}

	// Get repository topics/tags
	async getRepoTopics(username, repoName) {
		return this.fetchWithErrorHandling(
			`${GITHUB_API_BASE}/repos/${username}/${repoName}/topics`,
			{ 'Accept': 'application/vnd.github.mercy-preview+json' }
		);
	}

	// Get repository security advisories
	async getRepoSecurityAdvisories(username, repoName) {
		try {
			return this.fetchWithErrorHandling(
				`${GITHUB_API_BASE}/repos/${username}/${repoName}/security-advisories`
			);
		} catch (error) {
			console.error('Error fetching security advisories:', error);
			return [];
		}
	}

	// Get repository vulnerability alerts
	async getRepoVulnerabilityAlerts(username, repoName) {
		try {
			return this.fetchWithErrorHandling(
				`${GITHUB_API_BASE}/repos/${username}/${repoName}/vulnerability-alerts`
			);
		} catch (error) {
			console.error('Error fetching vulnerability alerts:', error);
			return [];
		}
	}

	// Get repository dependabot alerts
	async getRepoDependabotAlerts(username, repoName, options = {}) {
		const {
			state = 'open', // open, dismissed, fixed
			severity = '', // low, medium, high, critical
			ecosystem = '', // npm, pip, composer, nuget, etc.
			per_page = 30
		} = options;

		const params = new URLSearchParams({
			per_page: per_page.toString()
		});

		if (state) params.append('state', state);
		if (severity) params.append('severity', severity);
		if (ecosystem) params.append('ecosystem', ecosystem);

		try {
			return this.fetchWithErrorHandling(
				`${GITHUB_API_BASE}/repos/${username}/${repoName}/dependabot/alerts?${params}`
			);
		} catch (error) {
			console.error('Error fetching Dependabot alerts:', error);
			return [];
		}
	}

	// Get repository dependency graph
	async getRepoDependencies(username, repoName) {
		try {
			return this.fetchWithErrorHandling(
				`${GITHUB_API_BASE}/repos/${username}/${repoName}/dependency-graph/dependencies`
			);
		} catch (error) {
			console.error('Error fetching repository dependencies:', error);
			return [];
		}
	}

	// Get repository workflows (GitHub Actions)
	async getRepoWorkflows(username, repoName) {
		try {
			return this.fetchWithErrorHandling(
				`${GITHUB_API_BASE}/repos/${username}/${repoName}/actions/workflows`
			);
		} catch (error) {
			console.error('Error fetching repository workflows:', error);
			return { workflows: [] };
		}
	}

	// Get workflow runs
	async getWorkflowRuns(username, repoName, workflowId = null, options = {}) {
		const {
			status = '', // completed, action_required, cancelled, failure, neutral, skipped, stale, success, timed_out, in_progress, queued, requested, waiting
			conclusion = '', // success, failure, neutral, cancelled, skipped, timed_out, action_required
			branch = '',
			per_page = 30
		} = options;

		const params = new URLSearchParams({
			per_page: per_page.toString()
		});

		if (status) params.append('status', status);
		if (conclusion) params.append('conclusion', conclusion);
		if (branch) params.append('branch', branch);

		const endpoint = workflowId 
			? `${GITHUB_API_BASE}/repos/${username}/${repoName}/actions/workflows/${workflowId}/runs`
			: `${GITHUB_API_BASE}/repos/${username}/${repoName}/actions/runs`;

		try {
			return this.fetchWithErrorHandling(`${endpoint}?${params}`);
		} catch (error) {
			console.error('Error fetching workflow runs:', error);
			return { workflow_runs: [] };
		}
	}

	// Get repository environments
	async getRepoEnvironments(username, repoName) {
		try {
			return this.fetchWithErrorHandling(
				`${GITHUB_API_BASE}/repos/${username}/${repoName}/environments`
			);
		} catch (error) {
			console.error('Error fetching repository environments:', error);
			return { environments: [] };
		}
	}

	// Get repository deployments
	async getRepoDeployments(username, repoName, options = {}) {
		const {
			sha = '',
			ref = '',
			task = '',
			environment = '',
			per_page = 30
		} = options;

		const params = new URLSearchParams({
			per_page: per_page.toString()
		});

		if (sha) params.append('sha', sha);
		if (ref) params.append('ref', ref);
		if (task) params.append('task', task);
		if (environment) params.append('environment', environment);

		try {
			return this.fetchWithErrorHandling(
				`${GITHUB_API_BASE}/repos/${username}/${repoName}/deployments?${params}`
			);
		} catch (error) {
			console.error('Error fetching repository deployments:', error);
			return [];
		}
	}

	// Get user's gists
	async getUserGists(username = GITHUB_USERNAME, options = {}) {
		const {
			since = '', // ISO 8601 date string
			per_page = 30,
			page = 1
		} = options;

		const params = new URLSearchParams({
			per_page: per_page.toString(),
			page: page.toString()
		});

		if (since) params.append('since', since);

		return this.fetchWithErrorHandling(
			`${GITHUB_API_BASE}/users/${username}/gists?${params}`
		);
	}

	// Get user's received events (activity feed)
	async getUserReceivedEvents(username = GITHUB_USERNAME, options = {}) {
		const {
			per_page = 30,
			page = 1
		} = options;

		const params = new URLSearchParams({
			per_page: per_page.toString(),
			page: page.toString()
		});

		return this.fetchWithErrorHandling(
			`${GITHUB_API_BASE}/users/${username}/received_events?${params}`
		);
	}

	// Get user's public received events
	async getUserPublicReceivedEvents(username = GITHUB_USERNAME, options = {}) {
		const {
			per_page = 30,
			page = 1
		} = options;

		const params = new URLSearchParams({
			per_page: per_page.toString(),
			page: page.toString()
		});

		return this.fetchWithErrorHandling(
			`${GITHUB_API_BASE}/users/${username}/received_events/public?${params}`
		);
	}

	// Search code across repositories
	async searchCode(query, options = {}) {
		const {
			sort = '', // indexed
			order = 'desc',
			per_page = 30,
			page = 1
		} = options;

		const params = new URLSearchParams({
			q: query,
			per_page: per_page.toString(),
			page: page.toString()
		});

		if (sort) params.append('sort', sort);
		if (order) params.append('order', order);

		return this.fetchWithErrorHandling(
			`${GITHUB_API_BASE}/search/code?${params}`
		);
	}

	// Search commits
	async searchCommits(query, options = {}) {
		const {
			sort = 'author-date', // author-date, committer-date
			order = 'desc',
			per_page = 30,
			page = 1
		} = options;

		const params = new URLSearchParams({
			q: query,
			sort,
			order,
			per_page: per_page.toString(),
			page: page.toString()
		});

		return this.fetchWithErrorHandling(
			`${GITHUB_API_BASE}/search/commits?${params}`
		);
	}

	// Search issues and pull requests
	async searchIssues(query, options = {}) {
		const {
			sort = 'created', // comments, reactions, reactions-+1, reactions--1, reactions-smile, reactions-thinking_face, reactions-heart, reactions-tada, interactions, created, updated
			order = 'desc',
			per_page = 30,
			page = 1
		} = options;

		const params = new URLSearchParams({
			q: query,
			sort,
			order,
			per_page: per_page.toString(),
			page: page.toString()
		});

		return this.fetchWithErrorHandling(
			`${GITHUB_API_BASE}/search/issues?${params}`
		);
	}

	// Search users
	async searchUsers(query, options = {}) {
		const {
			sort = 'best-match', // followers, repositories, joined
			order = 'desc',
			per_page = 30,
			page = 1
		} = options;

		const params = new URLSearchParams({
			q: query,
			sort,
			order,
			per_page: per_page.toString(),
			page: page.toString()
		});

		return this.fetchWithErrorHandling(
			`${GITHUB_API_BASE}/search/users?${params}`
		);
	}

	// Get comprehensive user analytics
	async getComprehensiveUserAnalytics(username = GITHUB_USERNAME) {
		try {
			const [
				profile,
				repos,
				activity,
				starred,
				followers,
				following,
				orgs,
				gists
			] = await Promise.allSettled([
				this.getUserProfile(username),
				this.getUserRepos(username, { per_page: 100 }),
				this.getUserActivity(username),
				this.getUserStarred(username, { per_page: 50 }),
				this.getUserFollowers(username),
				this.getUserFollowing(username),
				this.getUserOrgs(username),
				this.getUserGists(username, { per_page: 50 })
			]);

			// Process repository data for detailed analytics
			const repoData = repos.status === 'fulfilled' ? repos.value : [];
			const languageStats = this.calculateLanguageStatistics(repoData);
			const collaborationStats = this.calculateCollaborationStatistics(repoData);
			const productivityStats = this.calculateProductivityStatistics(repoData);

			return {
				profile: profile.status === 'fulfilled' ? profile.value : null,
				repositories: {
					total: repoData.length,
					data: repoData,
					statistics: {
						totalStars: repoData.reduce((sum, repo) => sum + repo.stargazers_count, 0),
						totalForks: repoData.reduce((sum, repo) => sum + repo.forks_count, 0),
						totalWatchers: repoData.reduce((sum, repo) => sum + repo.watchers_count, 0),
						totalSize: repoData.reduce((sum, repo) => sum + repo.size, 0),
						languages: languageStats,
						collaboration: collaborationStats,
						productivity: productivityStats
					}
				},
				social: {
					followers: followers.status === 'fulfilled' ? followers.value : [],
					following: following.status === 'fulfilled' ? following.value : [],
					organizations: orgs.status === 'fulfilled' ? orgs.value : []
				},
				activity: {
					recent: activity.status === 'fulfilled' ? activity.value : [],
					starred: starred.status === 'fulfilled' ? starred.value : [],
					gists: gists.status === 'fulfilled' ? gists.value : []
				}
			};
		} catch (error) {
			console.error('Error getting comprehensive user analytics:', error);
			throw error;
		}
	}

	// Calculate detailed language statistics
	calculateLanguageStatistics(repos) {
		const languageCount = {};
		const languageBytes = {};
		const languageRepos = {};

		repos.forEach(repo => {
			if (repo.language) {
				languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
				languageBytes[repo.language] = (languageBytes[repo.language] || 0) + repo.size;
				
				if (!languageRepos[repo.language]) {
					languageRepos[repo.language] = [];
				}
				languageRepos[repo.language].push({
					name: repo.name,
					stars: repo.stargazers_count,
					size: repo.size
				});
			}
		});

		const totalRepos = Object.values(languageCount).reduce((sum, count) => sum + count, 0);
		const totalBytes = Object.values(languageBytes).reduce((sum, bytes) => sum + bytes, 0);

		return {
			byCount: Object.entries(languageCount)
				.sort(([,a], [,b]) => b - a)
				.map(([lang, count]) => ({
					language: lang,
					count,
					percentage: ((count / totalRepos) * 100).toFixed(1),
					repositories: languageRepos[lang]
				})),
			bySize: Object.entries(languageBytes)
				.sort(([,a], [,b]) => b - a)
				.map(([lang, bytes]) => ({
					language: lang,
					bytes,
					percentage: ((bytes / totalBytes) * 100).toFixed(1)
				})),
			summary: {
				totalLanguages: Object.keys(languageCount).length,
				mostUsed: Object.entries(languageCount).reduce((a, b) => a[1] > b[1] ? a : b, ['', 0])[0],
				totalBytes,
				totalRepos
			}
		};
	}

	// Calculate collaboration and community statistics
	calculateCollaborationStatistics(repos) {
		const forkStats = repos.filter(repo => repo.fork);
		const originalStats = repos.filter(repo => !repo.fork);
		
		return {
			originalRepositories: originalStats.length,
			forkedRepositories: forkStats.length,
			totalStarsReceived: originalStats.reduce((sum, repo) => sum + repo.stargazers_count, 0),
			totalForksReceived: originalStats.reduce((sum, repo) => sum + repo.forks_count, 0),
			averageStarsPerRepo: originalStats.length > 0 
				? (originalStats.reduce((sum, repo) => sum + repo.stargazers_count, 0) / originalStats.length).toFixed(1)
				: 0,
			mostStarredRepo: originalStats.reduce((max, repo) => 
				repo.stargazers_count > (max?.stargazers_count || 0) ? repo : max, null),
			repositoriesWithIssues: repos.filter(repo => repo.has_issues && repo.open_issues_count > 0).length,
			repositoriesWithWiki: repos.filter(repo => repo.has_wiki).length,
			repositoriesWithPages: repos.filter(repo => repo.has_pages).length
		};
	}

	// Calculate productivity and development statistics
	calculateProductivityStatistics(repos) {
		const now = new Date();
		const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
		const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
		const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

		const recentlyUpdated = repos.filter(repo => new Date(repo.updated_at) > oneMonthAgo);
		const activeInQuarter = repos.filter(repo => new Date(repo.updated_at) > threeMonthsAgo);
		const createdThisYear = repos.filter(repo => new Date(repo.created_at) > oneYearAgo);

		return {
			recentActivity: {
				lastMonth: recentlyUpdated.length,
				lastQuarter: activeInQuarter.length,
				thisYear: createdThisYear.length
			},
			repositoryAges: {
				newest: repos.reduce((newest, repo) => 
					new Date(repo.created_at) > new Date(newest?.created_at || 0) ? repo : newest, null),
				oldest: repos.reduce((oldest, repo) => 
					new Date(repo.created_at) < new Date(oldest?.created_at || Date.now()) ? repo : oldest, null)
			},
			maintenanceStats: {
				archivedCount: repos.filter(repo => repo.archived).length,
				activeCount: repos.filter(repo => !repo.archived).length,
				averageSizeKB: repos.length > 0 ? (repos.reduce((sum, repo) => sum + repo.size, 0) / repos.length).toFixed(0) : 0
			}
		};
	}
}

// Export a default instance
export default new GitHubAPI();

// Additional utility functions
export const formatRepoData = (repo) => ({
	id: repo.id,
	name: repo.name,
	fullName: repo.full_name,
	description: repo.description,
	url: repo.html_url,
	cloneUrl: repo.clone_url,
	language: repo.language,
	stars: repo.stargazers_count,
	forks: repo.forks_count,
	watchers: repo.watchers_count,
	issues: repo.open_issues_count,
	size: repo.size,
	defaultBranch: repo.default_branch,
	isArchived: repo.archived,
	isDisabled: repo.disabled,
	isPrivate: repo.private,
	isFork: repo.fork,
	hasPages: repo.has_pages,
	hasWiki: repo.has_wiki,
	hasIssues: repo.has_issues,
	hasProjects: repo.has_projects,
	hasDownloads: repo.has_downloads,
	license: repo.license,
	topics: repo.topics || [],
	createdAt: repo.created_at,
	updatedAt: repo.updated_at,
	pushedAt: repo.pushed_at
});

export const formatUserData = (user) => ({
	id: user.id,
	username: user.login,
	name: user.name,
	bio: user.bio,
	avatarUrl: user.avatar_url,
	profileUrl: user.html_url,
	location: user.location,
	blog: user.blog,
	twitterUsername: user.twitter_username,
	company: user.company,
	email: user.email,
	publicRepos: user.public_repos,
	publicGists: user.public_gists,
	followers: user.followers,
	following: user.following,
	createdAt: user.created_at,
	updatedAt: user.updated_at
});

// Rate limiting helper
export const withRateLimit = (func, delay = 1000) => {
	let lastCall = 0;
	
	return async (...args) => {
		const now = Date.now();
		const timeSinceLastCall = now - lastCall;
		
		if (timeSinceLastCall < delay) {
			await new Promise(resolve => setTimeout(resolve, delay - timeSinceLastCall));
		}
		
		lastCall = Date.now();
		return func(...args);
	};
};

// Export additional utility functions for enhanced GitHub API features

// Generate contribution calendar data
export const generateContributionHeatmap = (events) => {
	const contributionMap = new Map();
	
	events.forEach(event => {
		const date = new Date(event.created_at).toDateString();
		contributionMap.set(date, (contributionMap.get(date) || 0) + 1);
	});
	
	return Array.from(contributionMap.entries()).map(([date, count]) => ({
		date,
		count,
		level: Math.min(Math.floor(count / 5), 4) // 0-4 intensity levels
	}));
};

// Calculate language evolution over time
export const calculateLanguageEvolution = (repositories) => {
	const timeline = repositories.reduce((acc, repo) => {
		const year = new Date(repo.created_at).getFullYear();
		if (!acc[year]) acc[year] = {};
		if (repo.language) {
			acc[year][repo.language] = (acc[year][repo.language] || 0) + 1;
		}
		return acc;
	}, {});
	
	return Object.entries(timeline).map(([year, languages]) => ({
		year: parseInt(year),
		languages: Object.entries(languages).map(([lang, count]) => ({
			language: lang,
			count,
			isNew: !timeline[year - 1]?.[lang]
		}))
	}));
};

// Analyze collaboration network
export const analyzeCollaborationNetwork = (repositories) => {
	const collaborators = new Map();
	
	repositories.forEach(repo => {
		repo.contributors?.forEach(contributor => {
			if (!collaborators.has(contributor.login)) {
				collaborators.set(contributor.login, {
					username: contributor.login,
					avatar: contributor.avatar_url,
					repositories: [],
					totalContributions: 0
				});
			}
			
			const collab = collaborators.get(contributor.login);
			collab.repositories.push(repo.name);
			collab.totalContributions += contributor.contributions;
		});
	});
	
	return Array.from(collaborators.values())
		.sort((a, b) => b.totalContributions - a.totalContributions);
};

// Calculate repository health score
export const calculateRepoHealthScore = (repo, issues = [], pullRequests = [], workflows = []) => {
	let score = 100;
	
	// Deduct points for issues
	if (issues.length > 10) score -= 10;
	else if (issues.length > 5) score -= 5;
	
	// Deduct points for stale repositories
	const daysSinceUpdate = (Date.now() - new Date(repo.updated_at)) / (1000 * 60 * 60 * 24);
	if (daysSinceUpdate > 365) score -= 20;
	else if (daysSinceUpdate > 180) score -= 10;
	
	// Add points for good practices
	if (repo.has_wiki) score += 5;
	if (repo.has_pages) score += 5;
	if (repo.license) score += 10;
	if (repo.description) score += 5;
	if (workflows.length > 0) score += 10; // Has CI/CD
	if (repo.topics && repo.topics.length > 0) score += 5;
	
	// Add points for community engagement
	if (repo.stargazers_count > 50) score += 10;
	else if (repo.stargazers_count > 10) score += 5;
	
	return Math.max(0, Math.min(100, score));
};

// Calculate developer skill level based on repositories
export const calculateSkillLevel = (repositories, language) => {
	const langRepos = repositories.filter(repo => repo.language === language);
	
	if (langRepos.length === 0) return 0;
	
	const factors = {
		repoCount: Math.min(langRepos.length * 10, 50), // Max 50 points for repo count
		totalStars: Math.min(langRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0), 30), // Max 30 points for stars
		avgSize: Math.min(langRepos.reduce((sum, repo) => sum + repo.size, 0) / langRepos.length / 100, 20), // Max 20 points for avg size
	};
	
	return Math.min(100, Object.values(factors).reduce((sum, val) => sum + val, 0));
};

// Format large numbers for display
export const formatNumber = (num) => {
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1) + 'M';
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1) + 'K';
	}
	return num.toString();
};

// Calculate time ago from timestamp
export const timeAgo = (timestamp) => {
	const now = new Date();
	const past = new Date(timestamp);
	const diffInSeconds = Math.floor((now - past) / 1000);
	
	const intervals = {
		year: 31536000,
		month: 2592000,
		week: 604800,
		day: 86400,
		hour: 3600,
		minute: 60
	};
	
	for (const [unit, seconds] of Object.entries(intervals)) {
		const interval = Math.floor(diffInSeconds / seconds);
		if (interval >= 1) {
			return `${interval} ${unit}${interval !== 1 ? 's' : ''} ago`;
		}
	}
	
	return 'Just now';
};

// Extract repository topics and technologies
export const extractTechnologies = (repositories) => {
	const technologies = new Set();
	
	repositories.forEach(repo => {
		if (repo.language) technologies.add(repo.language);
		if (repo.topics) {
			repo.topics.forEach(topic => technologies.add(topic));
		}
	});
	
	return Array.from(technologies);
};

// Calculate repository activity trend
export const calculateActivityTrend = (repositories) => {
	const now = new Date();
	const periods = [
		{ name: 'week', days: 7 },
		{ name: 'month', days: 30 },
		{ name: 'quarter', days: 90 },
		{ name: 'year', days: 365 }
	];
	
	return periods.reduce((trends, period) => {
		const cutoff = new Date(now.getTime() - (period.days * 24 * 60 * 60 * 1000));
		const activeRepos = repositories.filter(repo => 
			new Date(repo.updated_at) > cutoff
		);
		
		trends[period.name] = {
			count: activeRepos.length,
			percentage: ((activeRepos.length / repositories.length) * 100).toFixed(1)
		};
		
		return trends;
	}, {});
};

// Security analysis utilities
export const analyzeSecurityAlerts = (alerts) => {
	const severityCount = alerts.reduce((acc, alert) => {
		acc[alert.security_advisory?.severity || 'unknown'] = 
			(acc[alert.security_advisory?.severity || 'unknown'] || 0) + 1;
		return acc;
	}, {});
	
	const totalAlerts = alerts.length;
	const criticalAlerts = severityCount.critical || 0;
	const highAlerts = severityCount.high || 0;
	
	return {
		total: totalAlerts,
		bySeverity: severityCount,
		riskScore: Math.min(100, (criticalAlerts * 10) + (highAlerts * 5)),
		status: totalAlerts === 0 ? 'secure' : 
				criticalAlerts > 0 ? 'critical' :
				highAlerts > 0 ? 'warning' : 'low-risk'
	};
};

// Performance optimization utilities
export const batchApiCalls = async (calls, batchSize = 5, delay = 1000) => {
	const results = [];
	
	for (let i = 0; i < calls.length; i += batchSize) {
		const batch = calls.slice(i, i + batchSize);
		const batchResults = await Promise.allSettled(batch.map(call => call()));
		results.push(...batchResults);
		
		// Add delay between batches to respect rate limits
		if (i + batchSize < calls.length) {
			await new Promise(resolve => setTimeout(resolve, delay));
		}
	}
	
	return results;
};

// Cache management for API responses
export class GitHubApiCache {
	constructor(ttl = 5 * 60 * 1000) { // 5 minutes default TTL
		this.cache = new Map();
		this.ttl = ttl;
	}
	
	set(key, value) {
		this.cache.set(key, {
			value,
			timestamp: Date.now()
		});
	}
	
	get(key) {
		const item = this.cache.get(key);
		if (!item) return null;
		
		if (Date.now() - item.timestamp > this.ttl) {
			this.cache.delete(key);
			return null;
		}
		
		return item.value;
	}
	
	clear() {
		this.cache.clear();
	}
	
	size() {
		return this.cache.size;
	}
}

// Export default cache instance
export const githubApiCache = new GitHubApiCache();
