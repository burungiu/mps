
#include <iostream>
#include <math.h>

class Point {
private:
	int x, y;
public:
	Point(int a, int b) {
		this->x = a;
		this->y = b;
	}
	static float distance(Point first, Point second) {
		return sqrt(pow(first.x - second.x, 2) + 
					pow(second.y - first.y, 2));
	}
};

class math {
public:
	static int suma(int a, int b) {
		return a + b;
	}
};

int main() {
	Point a(0, 0), b(1,1);
	std::cout<<Point::distance(a, b)<<std::endl;
	std::cout<<math::suma(10, 20);
	return 0;
}