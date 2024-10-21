import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Calendar } from 'lucide-react';
import { createGroup, getAllGroups, joinGroup, getUserGroups } from '../mockBackend';

const Groups = ({ user }) => {
  const [groups, setGroups] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      const allGroups = await getAllGroups();
      setGroups(allGroups);
      if (user) {
        const userGroupsData = await getUserGroups(user.id);
        setUserGroups(userGroupsData);
      }
    };
    fetchGroups();
  }, [user]);

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    const newGroup = await createGroup(e.target.name.value, e.target.description.value);
    setGroups([...groups, newGroup]);
    setShowCreateGroup(false);
  };

  const handleJoinGroup = async (groupId) => {
    if (user) {
      await joinGroup(user.id, groupId);
      const updatedGroups = groups.map(group =>
        group.id === groupId ? { ...group, members: group.members + 1 } : group
      );
      setGroups(updatedGroups);
      setUserGroups([...userGroups, updatedGroups.find(g => g.id === groupId)]);
    }
  };

  return (
    <div className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-white">Groups</h2>
      <div className="space-y-6">
        {groups.map((group) => (
          <div key={group.id} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{group.name}</h3>
            <p className="text-gray-600 mb-4">{group.description}</p>
            <div className="flex items-center text-gray-500">
              <Users className="mr-2" size={20} />
              <span>{group.members} members</span>
            </div>
            {!userGroups.some(g => g.id === group.id) && (
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600"
                onClick={() => handleJoinGroup(group.id)}
              >
                <UserPlus className="mr-2" size={20} />
                Join Group
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-white">Create New Group</h3>
        {showCreateGroup ? (
          <form onSubmit={handleCreateGroup} className="bg-white p-6 rounded-lg shadow">
            <input type="text" name="name" placeholder="Group Name" className="w-full p-2 mb-4 border rounded" required />
            <textarea name="description" placeholder="Description" className="w-full p-2 mb-4 border rounded" rows="3" required></textarea>
            <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded-md flex items-center justify-center hover:bg-green-600">
              <Users className="mr-2" size={20} />
              Create Group
            </button>
          </form>
        ) : (
          <button
            className="w-full bg-green-500 text-white px-4 py-2 rounded-md flex items-center justify-center hover:bg-green-600"
            onClick={() => setShowCreateGroup(true)}
          >
            <Users className="mr-2" size={20} />
            Create New Group
          </button>
        )}
      </div>
    </div>
  );
};

export default Groups;