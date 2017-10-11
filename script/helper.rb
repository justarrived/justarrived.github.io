def root_path
  "#{__dir__}/.."
end

def system_command(command)
  puts "$ #{command}"
  puts `#{command}`
end

def write_transifex_config!
  root_path = "#{__dir__}/.."
  dir_path = "#{root_path}/.tx"

  Dir.mkdir(dir_path) unless Dir.exists?(dir_path)
  File.write("#{root_path}/.tx/config", File.read("#{root_path}/_tx/config"))
end
