source 'https://rubygems.org'
ruby RUBY_VERSION

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!
gem 'jekyll', '3.2.1'

# This is the default theme for new Jekyll sites. You may change this to anything you like.
# gem "minima"

# Make sure to have the latest version of github-pages
# (will update even though bundle install is run...)
require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)
gem 'github-pages', versions['github-pages']

# If you have any plugins, put them here!
group :jekyll_plugins do
  # gem "jekyll-github-metadata", "~> 1.0"
  gem 'jekyll-multiple-languages-plugin', '~> 1.5'
  gem 'octopress-paginate', '~> 1.1'
end
