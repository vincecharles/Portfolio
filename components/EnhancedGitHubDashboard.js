// Example implementation of enhanced GitHub API features
// This file demonstrates how to use the new GitHub API capabilities

import { useState, useEffect } from 'react';
import githubAPI, { 
  generateContributionHeatmap,
  calculateLanguageEvolution,
  analyzeCollaborationNetwork,
  calculateRepoHealthScore,
  calculateSkillLevel,
  formatNumber,
  timeAgo,
  githubApiCache
} from '../utils/githubApi';

// Enhanced GitHub Dashboard Component
export function EnhancedGitHubDashboard({ username = 'vincecharles' }) {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadComprehensiveData() {
      try {
        setLoading(true);
        
        // Check cache first
        const cacheKey = `comprehensive-analytics-${username}`;
        const cachedData = githubApiCache.get(cacheKey);
        
        if (cachedData) {
          setAnalytics(cachedData);
          setLoading(false);
          return;
        }

        // Fetch comprehensive analytics
        const data = await githubAPI.getComprehensiveUserAnalytics(username);
        
        // Process additional analytics
        const processedData = {
          ...data,
          contributionHeatmap: generateContributionHeatmap(data.activity.recent),
          languageEvolution: calculateLanguageEvolution(data.repositories.data),
          collaborationNetwork: analyzeCollaborationNetwork(data.repositories.data),
          skillLevels: calculateSkillLevels(data.repositories.data)
        };

        // Cache the processed data
        githubApiCache.set(cacheKey, processedData);
        setAnalytics(processedData);
        
      } catch (err) {
        setError(err.message);
        console.error('Error loading GitHub analytics:', err);
      } finally {
        setLoading(false);
      }
    }

    loadComprehensiveData();
  }, [username]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!analytics) return null;

  return (
    <div className="enhanced-github-dashboard">
      {/* Overview Stats */}
      <StatsOverview analytics={analytics} />
      
      {/* Language Mastery */}
      <LanguageMasterySection 
        languages={analytics.repositories.statistics.languages}
        evolution={analytics.languageEvolution}
        skillLevels={analytics.skillLevels}
      />
      
      {/* Contribution Activity */}
      <ContributionSection 
        heatmap={analytics.contributionHeatmap}
        activity={analytics.activity}
        productivity={analytics.repositories.statistics.productivity}
      />
      
      {/* Repository Insights */}
      <RepositoryInsights 
        repositories={analytics.repositories.data}
        statistics={analytics.repositories.statistics}
      />
      
      {/* Security & Quality */}
      <SecurityQualitySection username={username} />
      
      {/* Collaboration Network */}
      <CollaborationSection 
        network={analytics.collaborationNetwork}
        social={analytics.social}
      />
    </div>
  );
}

// Stats Overview Component
function StatsOverview({ analytics }) {
  const stats = analytics.repositories.statistics;
  
  return (
    <div className="stats-grid">
      <StatCard
        title="Total Repositories"
        value={analytics.repositories.total}
        subtitle={`${stats.collaboration.originalRepositories} original`}
        trend={`+${stats.productivity.recentActivity.thisYear} this year`}
        icon="📁"
      />
      
      <StatCard
        title="Total Stars"
        value={formatNumber(stats.totalStars)}
        subtitle="Across all repositories"
        trend={`Avg ${stats.collaboration.averageStarsPerRepo} per repo`}
        icon="⭐"
      />
      
      <StatCard
        title="Languages"
        value={stats.languages.summary.totalLanguages}
        subtitle={`Most used: ${stats.languages.summary.mostUsed}`}
        trend="Continuously learning"
        icon="💻"
      />
      
      <StatCard
        title="Community"
        value={formatNumber(analytics.social.followers.length)}
        subtitle="Followers"
        trend={`Following ${analytics.social.following.length}`}
        icon="👥"
      />
    </div>
  );
}

// Language Mastery Component
function LanguageMasterySection({ languages, evolution, skillLevels }) {
  return (
    <section className="language-mastery">
      <h3>Programming Language Mastery</h3>
      
      <div className="language-charts">
        {/* Language Distribution */}
        <div className="language-distribution">
          <h4>Current Usage</h4>
          <div className="language-bars">
            {languages.byCount.slice(0, 5).map((lang, index) => (
              <LanguageBar
                key={lang.language}
                language={lang.language}
                percentage={lang.percentage}
                count={lang.count}
                skillLevel={skillLevels[lang.language]}
                rank={index + 1}
              />
            ))}
          </div>
        </div>
        
        {/* Evolution Timeline */}
        <div className="language-evolution">
          <h4>Language Learning Timeline</h4>
          <EvolutionChart data={evolution} />
        </div>
      </div>
    </section>
  );
}

// Contribution Activity Component
function ContributionSection({ heatmap, activity, productivity }) {
  return (
    <section className="contribution-activity">
      <h3>Development Activity</h3>
      
      <div className="activity-grid">
        {/* Contribution Heatmap */}
        <div className="contribution-heatmap">
          <h4>Contribution Calendar</h4>
          <ContributionHeatmap data={heatmap} />
        </div>
        
        {/* Recent Activity */}
        <div className="recent-activity">
          <h4>Recent Activity</h4>
          <ActivityFeed events={activity.recent.slice(0, 5)} />
        </div>
        
        {/* Productivity Metrics */}
        <div className="productivity-metrics">
          <h4>Productivity Insights</h4>
          <ProductivityChart data={productivity} />
        </div>
      </div>
    </section>
  );
}

// Security & Quality Section
function SecurityQualitySection({ username }) {
  const [securityData, setSecurityData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSecurityData() {
      try {
        // Get repositories first
        const repos = await githubAPI.getUserRepos(username, { per_page: 20 });
        
        // Analyze security for top repositories
        const securityAnalysis = await Promise.allSettled(
          repos.slice(0, 5).map(async (repo) => {
            const [alerts, dependencies, workflows] = await Promise.allSettled([
              githubAPI.getRepoDependabotAlerts(username, repo.name),
              githubAPI.getRepoDependencies(username, repo.name),
              githubAPI.getRepoWorkflows(username, repo.name)
            ]);
            
            return {
              repository: repo.name,
              healthScore: calculateRepoHealthScore(
                repo,
                [],
                [],
                workflows.status === 'fulfilled' ? workflows.value.workflows : []
              ),
              alerts: alerts.status === 'fulfilled' ? alerts.value : [],
              dependencies: dependencies.status === 'fulfilled' ? dependencies.value : [],
              hasCI: workflows.status === 'fulfilled' && workflows.value.workflows.length > 0
            };
          })
        );
        
        setSecurityData({
          repositories: securityAnalysis
            .filter(result => result.status === 'fulfilled')
            .map(result => result.value)
        });
        
      } catch (error) {
        console.error('Error loading security data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadSecurityData();
  }, [username]);

  if (loading) return <div>Loading security analysis...</div>;

  return (
    <section className="security-quality">
      <h3>Security & Code Quality</h3>
      
      <div className="security-grid">
        {securityData.repositories?.map((repo) => (
          <SecurityCard
            key={repo.repository}
            repository={repo.repository}
            healthScore={repo.healthScore}
            alertCount={repo.alerts.length}
            hasCI={repo.hasCI}
            dependencyCount={repo.dependencies.length}
          />
        ))}
      </div>
    </section>
  );
}

// Repository Insights Component
function RepositoryInsights({ repositories, statistics }) {
  const [sortBy, setSortBy] = useState('stars');
  const [filter, setFilter] = useState('all');

  const filteredRepos = repositories
    .filter(repo => {
      if (filter === 'all') return true;
      if (filter === 'original') return !repo.fork;
      if (filter === 'recent') return new Date(repo.updated_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      return repo.language === filter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'stars': return b.stargazers_count - a.stargazers_count;
        case 'updated': return new Date(b.updated_at) - new Date(a.updated_at);
        case 'size': return b.size - a.size;
        default: return 0;
      }
    });

  return (
    <section className="repository-insights">
      <div className="insights-header">
        <h3>Repository Portfolio</h3>
        
        <div className="controls">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="stars">Sort by Stars</option>
            <option value="updated">Sort by Updated</option>
            <option value="size">Sort by Size</option>
          </select>
          
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Repositories</option>
            <option value="original">Original Only</option>
            <option value="recent">Recently Updated</option>
            {statistics.languages.byCount.slice(0, 5).map(lang => (
              <option key={lang.language} value={lang.language}>
                {lang.language}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="repository-grid">
        {filteredRepos.slice(0, 12).map((repo) => (
          <EnhancedRepositoryCard
            key={repo.id}
            repository={repo}
            healthScore={calculateRepoHealthScore(repo)}
          />
        ))}
      </div>
    </section>
  );
}

// Helper function to calculate skill levels
function calculateSkillLevels(repositories) {
  const languages = [...new Set(repositories.map(repo => repo.language).filter(Boolean))];
  
  return languages.reduce((skills, language) => {
    skills[language] = calculateSkillLevel(repositories, language);
    return skills;
  }, {});
}

// Example component exports
export {
  StatsOverview,
  LanguageMasterySection,
  ContributionSection,
  SecurityQualitySection,
  RepositoryInsights
};

// Additional UI Components (these would be implemented separately)
const LoadingSpinner = () => <div className="loading-spinner">Loading...</div>;
const ErrorMessage = ({ message }) => <div className="error-message">Error: {message}</div>;
const StatCard = ({ title, value, subtitle, trend, icon }) => (
  <div className="stat-card">
    <div className="stat-icon">{icon}</div>
    <div className="stat-content">
      <h4>{title}</h4>
      <div className="stat-value">{value}</div>
      <div className="stat-subtitle">{subtitle}</div>
      <div className="stat-trend">{trend}</div>
    </div>
  </div>
);

const LanguageBar = ({ language, percentage, count, skillLevel, rank }) => (
  <div className="language-bar">
    <div className="language-info">
      <span className="language-name">#{rank} {language}</span>
      <span className="language-stats">{count} repos ({percentage}%)</span>
    </div>
    <div className="progress-container">
      <div 
        className="progress-bar" 
        style={{ width: percentage }}
      />
      <div 
        className="skill-level" 
        style={{ width: `${skillLevel}%` }}
      />
    </div>
  </div>
);

const ContributionHeatmap = ({ data }) => (
  <div className="contribution-heatmap">
    {data.map((day, index) => (
      <div
        key={index}
        className={`contribution-day level-${day.level}`}
        title={`${day.count} contributions on ${day.date}`}
      />
    ))}
  </div>
);

const ActivityFeed = ({ events }) => (
  <div className="activity-feed">
    {events.map((event, index) => (
      <div key={index} className="activity-item">
        <div className="activity-type">{event.type}</div>
        <div className="activity-repo">{event.repo?.name}</div>
        <div className="activity-time">{timeAgo(event.created_at)}</div>
      </div>
    ))}
  </div>
);

const SecurityCard = ({ repository, healthScore, alertCount, hasCI, dependencyCount }) => (
  <div className="security-card">
    <h4>{repository}</h4>
    <div className="health-score">
      <span>Health Score: {healthScore}/100</span>
      <div className="health-bar">
        <div 
          className="health-fill" 
          style={{ width: `${healthScore}%` }}
        />
      </div>
    </div>
    <div className="security-indicators">
      <span className={`indicator ${alertCount === 0 ? 'good' : 'warning'}`}>
        {alertCount} security alerts
      </span>
      <span className={`indicator ${hasCI ? 'good' : 'neutral'}`}>
        {hasCI ? 'Has CI/CD' : 'No CI/CD'}
      </span>
      <span className="indicator neutral">
        {dependencyCount} dependencies
      </span>
    </div>
  </div>
);

const EnhancedRepositoryCard = ({ repository, healthScore }) => (
  <div className="enhanced-repo-card">
    <div className="repo-header">
      <h4>{repository.name}</h4>
      <div className="repo-stats">
        <span>⭐ {repository.stargazers_count}</span>
        <span>🍴 {repository.forks_count}</span>
      </div>
    </div>
    
    <p className="repo-description">{repository.description}</p>
    
    <div className="repo-metadata">
      <span className="language">{repository.language}</span>
      <span className="updated">{timeAgo(repository.updated_at)}</span>
      <span className="size">{formatNumber(repository.size)} KB</span>
    </div>
    
    <div className="repo-health">
      <span>Health: {healthScore}/100</span>
      <div className="health-indicator">
        <div 
          className="health-bar" 
          style={{ width: `${healthScore}%` }}
        />
      </div>
    </div>
    
    {repository.topics && repository.topics.length > 0 && (
      <div className="repo-topics">
        {repository.topics.slice(0, 3).map(topic => (
          <span key={topic} className="topic-tag">{topic}</span>
        ))}
      </div>
    )}
  </div>
);
