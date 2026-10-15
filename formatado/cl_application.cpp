#include "cl_application.h"
#include <cstdlib>

cl_application::cl_application(cl_base* p_head_object, string s_object_name)
	: cl_base(p_head_object, s_object_name)
{
}

void cl_application::build_tree_objects()
{
	string s_root_name, s_head_path, s_sub_name;
	int i_class;
	cl_base* p_head = nullptr;

	cin >> s_root_name;
	set_name(s_root_name);

	while (cin >> s_head_path)
	{
		if (s_head_path == "endtree")
		{
			break;
		}
		cin >> s_sub_name >> i_class;

		p_head = get_by_coordinate(s_head_path);
		if (p_head == nullptr)
		{
			cout << "Object tree" << endl;
			print_tree();
			cout << "The head object " << s_head_path << " is not found" << endl;
			exit(1);
		}
		if (p_head->get_subordinate_by_name(s_sub_name) != nullptr)
		{
			cout << s_head_path << "     Dubbing the names of subordinate objects" << endl;
			continue;
		}

		if (i_class == 2)
		{
			new cl_class_2(p_head, s_sub_name);
		}
		else if (i_class == 3)
		{
			new cl_class_3(p_head, s_sub_name);
		}
		else if (i_class == 4)
		{
			new cl_class_4(p_head, s_sub_name);
		}
		else if (i_class == 5)
		{
			new cl_class_5(p_head, s_sub_name);
		}
		else if (i_class == 6)
		{
			new cl_class_6(p_head, s_sub_name);
		}
	}
}

int cl_application::exec_app()
{
	string s_command, s_coord;
	cl_base* p_current = this;
	cl_base* p_object = nullptr;

	cout << "Object tree" << endl;
	print_tree();

	while (cin >> s_command)
	{
		if (s_command == "END")
		{
			break;
		}
		cin >> s_coord;

		if (s_command == "SET")
		{
			p_object = p_current->get_by_coordinate(s_coord);
			if (p_object != nullptr)
			{
				p_current = p_object;
				cout << "Object is set: " << p_current->get_name() << endl;
			}
			else
			{
				cout << "The object was not found at the specified coordinate: " << s_coord << endl;
			}
		}
		else if (s_command == "FIND")
		{
			p_object = p_current->get_by_coordinate(s_coord);
			if (p_object != nullptr)
			{
				cout << s_coord << "     Object name: " << p_object->get_name() << endl;
			}
			else
			{
				cout << s_coord << "     Object is not found" << endl;
			}
		}
		else if (s_command == "MOVE")
		{
			p_object = p_current->get_by_coordinate(s_coord);
			if (p_object == nullptr)
			{
				cout << s_coord << "     Head object is not found" << endl;
			}
			else if (p_object->get_subordinate_by_name(p_current->get_name()) != nullptr)
			{
				cout << s_coord << "     Dubbing the names of subordinate objects" << endl;
			}
			else if (p_current->set_head(p_object))
			{
				cout << "New head object: " << p_object->get_name() << endl;
			}
			else
			{
				cout << s_coord << "     Redefining the head object failed" << endl;
			}
		}
		else if (s_command == "DELETE")
		{
			p_current->delete_subordinate(s_coord);
		}
	}

	cout << "Current object hierarchy tree" << endl;
	print_tree();
	return 0;
}
